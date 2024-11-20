import { isValidObjectId } from "mongoose"
import { productsModel } from "./models/productModel.js"

export class ProductsMongoManager{
    
    static async getProducts(page=1, limit=3, category=''){
        const query = category ? { category } : {};
        return await productsModel.paginate(
            query,   // filtro válido de mongodb, por ej: {code:{$gt:2500}}
            {page, limit, lean:true, sort:{code:1}}
        )
    }

    static async getProductById(id){
        try{
            if(!isValidObjectId(id)){
                console.log('no es un id valido')
                return -1  
            }
            let product = await productsModel.findById(id).lean()
            if(!product){
                console.log('no existe el producto')
                return -1
            }
            console.log(product)
            return product
        }catch(err){
            console.log('Error :'+err.message)
        }
    }

    static async addProduct(product={}){
        //Validaciones
        if(!product.tittle || !product.description ||  !product.code || !product.price || !product.status || !product.stock || !product.category){
            console.log('Faltan datos en el objeto')
            return false 
        }
        try{
            let nuevoProducto=  await productsModel.create(product)
            return nuevoProducto.toJSON()
        }catch(err){
            console.log('Error :'+err.message)
        }
    }

    static async updateProduct(id, product={}){
        try{
            if(!isValidObjectId(id)){
                return false
            }
            return await productsModel.findByIdAndUpdate(id,product,{new:true})
        }catch(err){
            console.log('Error :'+err.message)
        }
    }
}
