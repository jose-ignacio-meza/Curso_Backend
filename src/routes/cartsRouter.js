import {Router} from 'express'
//import { CartManager } from '../dao/cartManager.js'
import { CartMongoManager as CartManager } from '../dao/cartMongoManager.js'
export const router = Router()

//await CartManager.loadProducts()
//await CartManager.loadCarts()

router.get("/",async(req,res)=>{
    try{
        let carts= await CartManager.getCarts()
        console.log('Carritos '+JSON.stringify(carts, null,5))
        res.status(200).send( carts.docs)
    }catch(err){
        res.status(400).send('Hubo un error : '+err)
    }
})

router.get("/:id",async (req,res)=>{
    let {id}=req.params
    try{   
        let result= await CartManager.getCartById(id)
        console.log(result)
        if(result){
            res.status(200).send(result)
        }else{
            res.status(400).send('No se existe un carrito con id '+id)
        }
    }catch(err){
        res.status(400).send('Ocurrio un error al buscar el carrito id '+id+' error: '+err)
    }
})

router.post("/", async(req,res)=>{
    let {products}=req.body
    if(!products){
        res.status(400).send('se debe cargar un producto o varios')
    }else{
        try{
            let result = await CartManager.addCart(products)
            res.status(200).send('Se cargo correctamente el nuevo carrito'+result)
        }catch(err){
            res.status(400).send('error al crear el nuevo carrito error: '+err)
        }
    }
})

router.post("/:cid/product/:pid", async(req,res)=>{
    let {cid,pid}= req.params
    let {quantity}= req.body
    try{
        let result = await CartManager.addProduct(cid,pid,quantity)
        if (!result){
            res.status(400).send('No se encontro el cart o producto con los id indicados')
        }else{
            res.status(200).send('Se agrego correctamente el producto con id :'+pid+' en el carro con id :'+cid)
        }
    }catch(err){
        res.status(400).send('No se pudo cargar el producto en el carro por el error :'+err)
    }
})