import {Router} from 'express'
import { CartManager } from '../dao/cartManager.js'

export const router = Router()

await CartManager.loadProducts()
await CartManager.loadCarts()

router.get("/",(req,res)=>{
    try{
        res.status(200).send( console.log('hola desde el get cart'))
    }catch(err){
        res.status(400).send('Hubo un error : '+err)
    }
})

router.post("/", async(req,res)=>{
    let {products}=req.body
    if(!products){
        res.status(400).send('se debe cargar un producto o varios')
    }else{
        try{
            let result = await CartManager.addCart(products)
            res.status(200).send('Se cargo correctamente el nuevo carrito')
        }catch(err){
            res.status(400).send('error al crear el nuevo carrito error: '+err)
        }
    }
})

router.get("/:id",async (req,res)=>{
    let {id}=req.params
    try{   
        let result= await CartManager.getCartById(Number(id))
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

router.post("/:cid/product/:pid", async(req,res)=>{
    let {cid,pid}= req.params
    let {quantity}= req.body
    try{
        let result= await CartManager.addProduct(Number(cid),Number(pid),quantity)
        if (!result){
            res.status(400).send('No se encontro el cart con id :'+cid)
        }else{
            res.status(200).send('Se agrego correctamente el producto con id :'+pid+' en el carro con id :'+cid)
        }
    }catch(err){
        res.status(400).send('No se pudo cargar el producto en el carro por el error :'+err)
    }
})