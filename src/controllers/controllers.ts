import { Request, Response } from 'express';
require('dotenv').config();

//qui stabilisco la connessione col database
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
    description: string,
    img: string,
    category_id: number
}

type Category = {
    id: number,
    name: string
}

//funzioni che userò per fare le query e ottenere i dati che passerò nel reindering delle view 
let getCategories = () => {
    //faccio la query per ottenere tutte le categorie
    return new Promise<Category[]>((resolve, reject) => {
        let sql = 'SELECT * FROM categories';
        connection.query(sql, function (error: Error, results: Category[]) {
            if (error)
               throw error;
             
            return resolve(results);
        }); 
    });
};

let getProducts = (req: Request) => {
    //faccio la query per ottenere tutti i prodotti
    return new Promise<Product[]>((resolve, reject) => {
        let sql = 'SELECT * FROM products';
        connection.query(sql, function (error: Error, results: Product[]) {
            if (error)
               throw error;

               if (!req.session.cart) {
                    req.session.cart = [];
               }
             
            return resolve(results);
        }); 
    });
};

let getProductsByCategory = (category: string) => {
    //faccio la query per ottenre i prodotti di una certa categoria, facendo una query annidata 
    return new Promise<Product[]>((resolve, reject) => {
        let sql = 'SELECT * FROM products WHERE category_id = ';
            sql += '(SELECT id FROM categories WHERE name = ' + connection.escape(category) + ')';
        connection.query(sql, function (error: Error, results: Product[]) {
            if (error)
               throw error;
             
            return resolve(results);
        }); 
    });
};


//faccio reindering delle view 

const indexView = (req: Request, res: Response) => {
    res.render("./index");
}

//For Shop Page
const shopView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProducts(req);   
    let cats: Category[] = await getCategories();
    res.render("./shop", {products: prods, categories: cats});  //gli passo nel reindering tutti i prodotti e tutte le categorie 
}

const shopFilterView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProductsByCategory(req.params.category);
    let cats: Category[] = await getCategories();
    res.render("./shop", {products: prods, categories: cats, category: req.params.category});  //gli passo nel reindergin i prodotti di una certa categoria e tutte le categorie
}


const aboutView = (req: Request, res: Response) => {
    res.render("./about");
}

const contactView = (req: Request, res: Response) => {
    res.render("./contact");
}

const checkoutView = (req: Request, res: Response) => {
    res.render("./checkout");
}

const thankyouView = (req: Request, res: Response) => {
    res.render("./thankyou");
}

const addCart = (req: Request, res: Response) => {
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const image = req.body.product_image;

    let product_exists: Boolean = false;
    for (let i = 0; i < req.session.cart.length; i++) {
        
        if (req.session.cart[i].product_id == product_id) {
            req.session.cart[i].quantity += 1;
            product_exists = true;
        }

    }

    if (!product_exists) {
        const cart_data = {
            product_id: product_id,
            product_name: product_name,
            price: product_price,
            image: image, 
            quantity: 1,
        };
        req.session.cart.push(cart_data);
    }
    res.redirect("/shop");
}


const cartView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProducts(req);
    res.render("./cart", {cart_data: req.session.cart});
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
};