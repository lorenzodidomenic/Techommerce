import { Request, Response } from 'express';
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USERNAME,
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

const indexView = (req: Request, res: Response) => {
    res.render("./index");
}

const shopView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProducts();
    let cats: Category[] = await getCategories();
    checkSessionDataInitialized(req);
    res.render("./shop", {products: prods, categories: cats});
}

const shopFilterView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProductsByCategory(req.params.category);
    let cats: Category[] = await getCategories();
    checkSessionDataInitialized(req);
    res.render("./shop", {products: prods, categories: cats, category: req.params.category});
}

const addCart = async (req: Request, res: Response) => {
    const action = req.body.action;
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_quantity = req.body.product_quantity;
    const image = req.body.product_image;

    const index = req.session.cart.findIndex((element) => element.product_id === product_id);
    if (index !== -1) {
        if(req.session.cart[index].quantity < product_quantity){
            req.session.cart[index].quantity += 1;
        }
    } else {
        const product = {
            product_id: product_id,
            product_name: product_name,
            price: product_price,
            image: image, 
            quantity: 1,
            max_quantity: product_quantity
        };
        req.session.cart.push(product);
    }
    
    if (action === "add_product")
        res.redirect("/shop#products_list");
    else
        res.redirect("/cart#products_list");

}

const removeCart = (req: Request, res: Response) => {
    const product_id = req.body.product_id;
   
    const index = req.session.cart.findIndex((element) => element.product_id === product_id);
    if(index !== -1){
        req.session.cart[index].quantity--;
        if(req.session.cart[index].quantity === 0)
            req.session.cart.splice(index, 1);
    }
   
    res.redirect("/cart#products_list");
}

const aboutView = (req: Request, res: Response) => {
    res.render("./about");
}

const contactView = (req: Request, res: Response) => {
    res.render("./contact");
}

const cartView = async (req: Request, res: Response) => {
    checkSessionDataInitialized(req);
    req.session.cartTotal = 0.0;
    for (let i = 0; i < req.session.cart.length; i++) {
        req.session.cartTotal += (req.session.cart[i].price * req.session.cart[i].quantity);
    }
    res.render("./cart", {cart_data: req.session.cart, cart_total: req.session.cartTotal});
}

const checkoutView = (req: Request, res: Response) => {
    res.render("./checkout");
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
    checkoutView,
    thankyouView,
    addCart,
    removeCart
};