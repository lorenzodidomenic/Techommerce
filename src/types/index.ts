import { Session } from 'express-session';

type cartData = {
    product_id: number,
    product_name: string,
    price: number,
    img: string,
    quantity: number,
    max_quantity: number
};

declare module 'express-session' {
    interface Session {
        userId: string,
        cart: cartData[],
        cartTotal: number,
        productsUnavailable: number[]   
    }
}