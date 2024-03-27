import { Request, Response } from 'express';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'techommerce'
});

type Product = {
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
        let sql = 'SELECT * FROM products';
        connection.query(sql, function (error: Error, results: Product[]) {
            if (error)
               throw error;
             
            return resolve(results);
        }); 
    });
};

let getProductsByCategory = (category: string) => {
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

const indexView = (req: Request, res: Response) => {
    res.render("./index");
}

//For Shop Page
const shopView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProducts();
    let cats: Category[] = await getCategories();
    res.render("./shop", {products: prods, categories: cats});
}

const shopFilterView = async (req: Request, res: Response) => {
    let prods: Product[] = await getProductsByCategory(req.params.category);
    let cats: Category[] = await getCategories();
    res.render("./shop", {products: prods, categories: cats, category: req.params.category});
}

const aboutView = (req: Request, res: Response) => {
    res.render("./about");
}

const contactView = (req: Request, res: Response) => {
    res.render("./contact");
}

const cartView = (req: Request, res: Response) => {
    res.render("./cart");
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
    thankyouView
};