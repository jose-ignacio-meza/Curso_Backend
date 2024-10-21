import fs from 'fs'

export class CartManager{

    static #path='./src/data/carts.json'
    static #pathProducts='./src/data/products.json'
    static #products= []
    static #carts= []
    
    constructor(){

    }

    static setPath(rutaArchivo=""){
        this.#path=rutaArchivo
    }

    static UltimoId (){
        if(this.#carts.length == 0){
            let ultimoId= 1
            return ultimoId
        }

        //Busco el ultimo elemento
        let ultimoElemento= this.#carts.length -1
        let ultimoId = CartManager.#carts[ultimoElemento].id
        return ultimoId +1
    }

    static async loadProducts(){
        if(fs.existsSync(this.#pathProducts)){
            let data = await fs.promises.readFile(this.#pathProducts, "utf-8")
            CartManager.#products = JSON.parse(data) || [];
            console.log("se cargaron los productos desde el json un total "+CartManager.#products.length+" productos en el dao de carts.")
        }else{
            return []
        }
    }

    static async loadCarts(){
        if(fs.existsSync(this.#path)){
            let data = await fs.promises.readFile(this.#path, "utf-8")
            CartManager.#carts = JSON.parse(data) || []
        }else{
            return []
        }

    }

    static async addCart(products){
        let id = CartManager.UltimoId()
        let newCart= {"id":id,"products":products}
        CartManager.#carts.push(newCart)
        try{
            await fs.promises.writeFile(this.#path, JSON.stringify(CartManager.#carts, null, 5 ),{encoding:"utf-8"})
            return true
        }catch(err){
            return err
        }
    }

    static async getCartById(id){
        let existe = CartManager.#carts.findIndex(c => c.id === id)
        if(existe == -1){
           return false 
        }else{
            let cart = CartManager.#carts[existe]
            return cart
        }
    }

    static async addProduct(idCart,idProduct,quantity){
        
        let cart= await CartManager.getCartById(idCart)
        let newProduct = {"id":idProduct,"quantity":quantity}
        if(!cart){
            return false
        }
        let existeProducto = cart.products.findIndex(p=>p.id === newProduct.id)
        
        if( existeProducto == -1){
            cart.products.push(newProduct)
        }else{
            cart.products[existeProducto].quantity= cart.products[existeProducto].quantity + quantity
        }
        console.log(cart.products)
        try{
            await fs.promises.writeFile(CartManager.#path, JSON.stringify(CartManager.#carts, null, 5), {encoding:"utf-8"})
            return true
        }catch(err){
            return err
        }
    }

}