import { Request, Response } from 'express';
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DB
});

export type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    description: string,
    img: string,
    category_id: number
}

type Category = {
    id: number,
    name: string
}

function checkSessionDataInitialized(req: Request){
    if (!req.session.cart) {
        req.session.cart = [];
    }

    if(!req.session.cartTotal){
        req.session.cartTotal = 0.0;
    }

    if(!req.session.listOrder){
        req.session.listOrder = [];
    }

    if(!req.session.listOrderPrice){
        req.session.listOrderPrice = [];
    }

    if(!req.session.listOrderTotal){
        req.session.listOrderTotal = 0.0;
    }

    if(!req.session.productsUnavailable){
        req.session.productsUnavailable = [];
    }
}

function computeCartTotal(req: Request){
    req.session.cartTotal = 0.0;
    for (let i = 0; i < req.session.cart.length; i++) {
        req.session.cartTotal += (req.session.cart[i].price * req.session.cart[i].quantity);
    }
}

let getCategories = () => {
    return new Promise<Category[]>((resolve, reject) => {
        let sql = 'SELECT * FROM categories';
        connection.query(sql, function (error: Error, results: Category[]) {
            if (error)
               throw error;
             
            return resolve(results);
        }); 
    });
};

let getProducts = () => {
    return new Promise<Product[]>((resolve, reject) => {
        let sql = 'SELECT * FROM products WHERE quantity > 0';
        connection.query(sql, function (error: Error, results: Product[]) {
            if (error)
               throw error;
            
            return resolve(results);
        }); 
    });
};

let getProductsByCategory = (category: string) => {
    return new Promise<Product[]>((resolve, reject) => {
        let sql = 'SELECT * FROM products WHERE quantity > 0 AND category_id = ';
            sql += '(SELECT id FROM categories WHERE name = ' + connection.escape(category) + ')';
        connection.query(sql, function (error: Error, results: Product[]) {
            if (error)
               throw error;
             
            return resolve(results);
        }); 
    });
};

let updateQuantity = (cart: cartData) => {
        connection.query('UPDATE `products` SET `quantity`= ? WHERE `id` = ?', 
        [cart.max_quantity - cart.quantity, cart.product_id], 
        function (error: Error, results: Object) {
            if (error) throw error;        
        });
}

const indexView = (req: Request, res: Response) => {
    res.render("./index");
}

const shopView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProducts();
    let cats: Category[] = await getCategories();
    checkSessionDataInitialized(req);
    res.render("./shop", {products: prods, categories: cats, products_unavailable: req.session.productsUnavailable});
}

const shopFilterView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProductsByCategory(req.params.category);
    let cats: Category[] = await getCategories();
    checkSessionDataInitialized(req);
    res.render("./shop", {products: prods, categories: cats, category: req.params.category, products_unavailable: req.session.productsUnavailable});
}

const addCart = async (req: Request, res: Response) => {
    const action: string = req.body.action;
    const product_id: number = req.body.product_id;
    const product_name: string = req.body.product_name;
    const product_price: number = req.body.product_price;
    const product_quantity: number = req.body.product_quantity;
    const image: string = req.body.product_image;

    const index = req.session.cart.findIndex((element) => element.product_id == product_id); // find product in the cart
    if (index !== -1) {
        if(req.session.cart[index].quantity < product_quantity){
            req.session.cart[index].quantity++;
            if(req.session.cart[index].quantity == product_quantity){ // reach maximum quantity
                req.session.productsUnavailable.push(product_id);
            }   
        }
    } else {
        const product = {
            product_id: product_id,
            product_name: product_name,
            price: product_price,
            img: image, 
            quantity: 1,
            max_quantity: product_quantity
        };
        req.session.cart.push(product); // add product in the cart
    }

    if (action === "add_product"){
        res.json({product_id: product_id, products_unavailable: req.session.productsUnavailable});
    }
    else{
        const index = req.session.cart.findIndex((element) => element.product_id == product_id);
        computeCartTotal(req);
        res.json({cart_element: req.session.cart[index], cart_total: req.session.cartTotal});
    }
}

const decreaseCart = (req: Request, res: Response) => {
    const product_id = req.body.product_id;
   
    const index = req.session.cart.findIndex((element) => element.product_id === product_id);
    let product_removed: Boolean = false;
    if(index !== -1){
        req.session.cart[index].quantity--;
        if(req.session.cart[index].quantity < req.session.cart[index].max_quantity){ // product is again available 
            const j = req.session.productsUnavailable.findIndex((element) => element === product_id);
            if(j !== -1)
                req.session.productsUnavailable.splice(j, 1);
        }

        if(req.session.cart[index].quantity === 0){
            product_removed = true;
            req.session.cart.splice(index, 1); // remove product from the cart
        }

    }
   
    computeCartTotal(req);
    if(!product_removed){
        if(req.session.cart.length > 0)
            res.json({product_deleted: false, cart_element: req.session.cart[index], cart_total: req.session.cartTotal});
        else
            res.json({product_deleted: false, cart_element: req.session.cart[index], cart_total: req.session.cartTotal, empty_cart: true});
    }
    else{
        if(req.session.cart.length > 0)
            res.json({product_deleted: true, product_id: product_id, cart_total: req.session.cartTotal});
        else
            res.json({product_deleted: true, product_id: product_id, cart_total: req.session.cartTotal, empty_cart: true});
    }
}

const emptyCart = (req:Request, res:Response) => {

    checkSessionDataInitialized(req);

    while(req.session.cart.length > 0){
        req.session.cart.pop();
    }

    while(req.session.productsUnavailable.length > 0){
        req.session.productsUnavailable.pop();
    }

    req.session.cartTotal = 0.0;

    res.redirect("/cart");
}

const aboutView = (req: Request, res: Response) => {
    res.render("./about");
}

const contactView = (req: Request, res: Response) => {
    res.render("./contact");
}

const cartView = (req: Request, res: Response) => {
    checkSessionDataInitialized(req);
    computeCartTotal(req);
    res.render("./cart", {cart_data: req.session.cart, cart_total: req.session.cartTotal, products_unavailable: req.session.productsUnavailable});
}

type cartData = {
    product_id: number,
    product_name: string,
    price: number,
    img: string,
    quantity: number,
    max_quantity: number
};

const buyCart = (req: Request , res: Response) => {
  
    checkSessionDataInitialized(req);

    // deep clone of the cart
    const cart: cartData[] = [];
    for (let i = 0; i < req.session.cart.length; i++){
        cart.push(req.session.cart[i]);
        updateQuantity(req.session.cart[i]);
    }

    // add cart to list of orders
    req.session.listOrder.push(cart);
    req.session.listOrderPrice.push(req.session.cartTotal);
    req.session.listOrderTotal += req.session.cartTotal;

    // empty cart
    while(req.session.cart.length > 0){
        req.session.cart.pop();
    }
    while(req.session.productsUnavailable.length > 0){
        req.session.productsUnavailable.pop();
    }
    req.session.cartTotal = 0.0;

    res.redirect("./orders");   /* print values in orders page */
}

const ordersView = (req: Request, res: Response) => {
    res.render("./orders", {listOrder: req.session.listOrder, listOrderPrice: req.session.listOrderPrice, listOrderTotal : req.session.listOrderTotal});
}

const thankyouView = (req: Request, res: Response) => {
    res.render("./thankyou");
}

module.exports =  {
    indexView,
    shopView,
    shopFilterView,
    aboutView,
    contactView,
    cartView,
    ordersView,
    thankyouView,
    decreaseCart,
    addCart,
    emptyCart,
    buyCart
};