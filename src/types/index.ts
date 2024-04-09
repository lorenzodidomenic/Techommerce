import { Session } from 'express-session';

type cartData = {
    product_id: string,
    product_name: string,
    price: number,
    image: string,
    quantity: number,
    max_quantity: number
};

declare module 'express-session' {
    interface Session {
        userId: string,
        cart: cartData[],
        cartTotal: number    
    }
}