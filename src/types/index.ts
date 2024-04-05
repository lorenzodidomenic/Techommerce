import { Session } from 'express-session'
import { Product } from '../controllers/controllers'

type cartData = {
    product_id: string,
    product_name: string,
    price: number,
    image: string,
    quantity: number,

};

declare module 'express-session' {
    interface Session {
        userId: string,
        cart: cartData[],    
    }
}