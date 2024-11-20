import { cartModel } from './models/cartModel.js'
import { isValidObjectId } from 'mongoose'


export class CartMongoManager{

    static async getCarts(page=1, limit=10){
        try{
            return await cartModel.paginate(
                {},   // filtro válido de mongodb, por ej: {code:{$gt:2500}}
                {page, limit, lean:true, sort:{code:1}}
            )
        }catch(err){
            return console.log('Error: '+err.message)
        }
    }

    static async getCartById(id){
        try{
            if (!isValidObjectId(id)){
            return false 
            }
            let cart= await cartModel.findById(id)
            if(!cart){
                return false
            }
            return cart
        }catch(err){
            return console.log('error :'+err.message)
        }
    }

    static async addCart(products){
        try{
            return await cartModel.create({products})
        }catch(err){
            return err
        }
    }

    static async addProduct(idCart,idProduct,quantity){
        if(!isValidObjectId(idCart)){
            console.log('El id del carrito no es valido '+idCart)
            return false
        }
        if(!isValidObjectId(idProduct)){
            console.log('El id del producto no es valido '+idCart)
            return false
        }
        try{
            let cart= await cartModel.findById(idCart)
            let newProduct = {"id":idProduct,"quantity":quantity}
            let existeProducto = cart.products.findIndex(p=> p.id.toString() === idProduct)
            if( existeProducto !== -1){
                cart.products[existeProducto].quantity += quantity;
            }else{
                cart.products.push(newProduct);
            }
            const updatedCart = await cart.save();
            console.log("Carrito actualizado:", updatedCart);
            return updatedCart;
        }catch(err){
            return console.log('Error :'+err.message)
        }
    }

}