import { Router } from "express"
import { ProductManager } from "../dao/productManager.js"

export const viewsRouter = Router()

viewsRouter.get("/", async(req,res)=>{
    try{
        let products= await ProductManager.getProducts()
        res.render("home",{products})
    }catch(err){
        res.status(401).send(console.log('Error al cargar productos, error:'+err))
    }
})

viewsRouter.get("/product/:id", async(req,res)=>{
    let {id} = req.params
    id= Number(id)
    if (id){
        try{
            let product = await ProductManager.getProductById(id)
            console.log(product)
            if(product == -1){
                let error = 'No existe un elemento con id '+id
                res.render("error",{error})
            }else{
                res.render("product",{product})
            }
        }catch(err){
            res.status(400).send('Hubo un error :'+err)
        }
    }else{
        res.status(400).send('El id tiene que ser un numero :'+err)
    }
})