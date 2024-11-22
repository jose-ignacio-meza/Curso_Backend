import { cartModel } from './models/cartModel.js'
import { isValidObjectId } from 'mongoose'
import { productsModel } from './models/productModel.js';

export class CartMongoManager{

    static async deleteProduct(idCart, idProduct) {
        try {
            // Buscar el carrito por ID
            const carrito = await cartModel.findById(idCart);
            if (!carrito) {
                console.log("El carrito con ID " + idCart + " no existe");
                return false;
            }
    
            // Filtrar los productos para eliminar el producto con el ID especificado
            const initialProductCount = carrito.products.length; // Para verificar si se eliminó algo
            carrito.products = carrito.products.filter(product => product.id.toString() !== idProduct.toString());
    
            // Verificar si el producto fue eliminado
            if (carrito.products.length === initialProductCount) {
                console.log("El producto con ID " + idProduct + " no estaba en el carrito");
                return false;
            }
    
            // Guardar los cambios
            await carrito.save();
            console.log("Producto eliminado con éxito");
            return true;
        } catch (err) {
            console.log("Error: " + err.message);
            return false;
        }
    }

    static async deleteAllProducts(idCart){
        let carrito= await cartModel.findById(idCart)
        if(!carrito){
            console.log('No existe el carrito con id :'+idCart)
            return false
        }
        carrito.products= []
        await carrito.save()
        return true
    }

    static async actualizarProducts(idCart, products){
        let carrito = await cartModel.findById(idCart)
        if(!carrito){
            console.log('No existe el carrito con id :'+idCart)
            return false
        }
        carrito.products= products
        await carrito.save()
        return true
    }

    static async actualizarProductQuantity(cid,pid,quantity){
        let carrito= await cartModel.findById(cid)
        if(!carrito){
            console.log('El cart con id '+cid+' no existe')
            return false
        }
        let existe= carrito.products.findIndex(p=>p.id == pid) 
        if(existe == -1){
            console.log('El producto con id '+pid+' no existe en el cart con id '+cid)
            return existe
        }
        carrito.products[existe].quantity= quantity
        await carrito.save()
        return true
    }

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
            const cart = await cartModel.findById(id).populate("products.id").lean();
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
            if(!cart){
                return cart
            }
            let existeProducto = await productsModel.findById(idProduct)
            if(!existeProducto){
                return existeProducto
            }
            let existeProductoEnCarro = cart.products.findIndex(p=> p.id.toString() === idProduct)
            if( existeProductoEnCarro !== -1){
                cart.products[existeProductoEnCarro].quantity += quantity;
            }else{
                let newProduct = {"id":idProduct,"quantity":quantity}
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