import {Router} from 'express'
//import { CartManager } from '../dao/cartManager.js'
import { CartMongoManager as CartManager } from '../dao/cartMongoManager.js'
import { isValidObjectId } from 'mongoose'
import { cartModel } from '../dao/models/cartModel.js'
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


router.put("/:cid", async (req,res)=>{
    let {cid}= req.params
    let {products} = req.body
    if (products.length >0){
        try{
            let result = await CartManager.actualizarProducts(cid,products)
            if(result){
                res.status(200).send('Se actualizo correctamente el carrito con id: '+cid+' con los productos '+JSON.stringify(products))
            }else{
                res.status(401).send('No existe un carrito con el id '+cid)
            }
        }catch(err){
            console.log('Error : '+err.message)
        }
    }else{
        res.status(400).send('Se debe ingresar un arreglo con al menos 1 producto')
    }
})

router.put("/:cid/product/:pid", async (req,res)=>{
    let {cid,pid}= req.params
    let {quantity}= req.body
    if((!isValidObjectId(cid)) || (!isValidObjectId(pid))){
        res.status(401).send(console.log('El id del carro o del producto no es valido'))
    }else{
        try{
            let result= await CartManager.actualizarProductQuantity(cid,pid,quantity)
            if(result === -1){
                res.status(400).send('No se pudo actualizar el producto ya que no se encuentra en el carrito')
            }else{
                if(result){
                    res.status(200).send('Producto actualizado')
                }else{
                    res.status(400).send('No se pudo actualizar el producto porque no existe el carrito')
                }
            }
        }catch(err){
            res.status(400).send(console.log('Error : '+err.message))
        }
    }
})


router.post("/:cid/product/:pid", async(req,res)=>{
    let {cid,pid}= req.params
    let {quantity}= req.body
    try{
        let result = await CartManager.addProduct(cid,pid,quantity)
        if(result === null){
            res.status(400).send('No existe un cart o un producto con ese id')
        }else{
            if (!result){
                res.status(400).send('No se encontro el cart o producto con los id indicados')
            }else{
                res.status(200).send('Se agrego correctamente el producto con id :'+pid+' en el carro con id :'+cid)
            }
        }
    }catch(err){
        res.status(400).send('No se pudo cargar el producto en el carro por el error :'+err)
    }
})


router.delete("/:cid/product/:pid", async(req,res)=>{
    let {cid,pid}= req.params
    try{
        if(!isValidObjectId(cid)){
            res.status(400).send('No es valido el id del carrito')
        }else
        if(!isValidObjectId(pid)){
            res.status(400).send('No es valido el id del producto')
        }else{
            let result= await CartManager.deleteProduct(cid,pid)
            if(result){
                res.status(200).send('Se elimino el producto del carrito existosamente')
            }else{
                res.status(400).send('No se encontro el producto ')
            }
        }
    }catch(err){
        res.status(400).send('Error al eliminar el producto, error: '+err.message)
    }
})


router.delete("/:cid", async (req,res)=>{
    let {cid}= req.params
    try{
        if(!isValidObjectId(cid)){
            res.status(401).send('El id no es valido')
        }else{
            let result = await CartManager.deleteAllProducts(cid)
            if(result){
                res.status(200).send('El cart con id '+cid+' quedo sin productos')
            }else{
                res.status(400).send('El carrito con id '+cid+' no existe')
            }
        }
    }catch(err){
        console.log('Error : '+err.message)
    }
})