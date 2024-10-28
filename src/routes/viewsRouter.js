import { Router } from "express"
import { ProductManager } from "../dao/productManager.js"

export const viewsRouter = Router()

viewsRouter.get("/", (req,res)=>{
    res.render("home",{})
})

viewsRouter.get("/products",  async (req,res)=>{
    try{
        let products= await ProductManager.getProducts()
        res.render("products",{products})
    }catch(err){
        res.status(401).send(console.log('Error al cargar productos, error:'+err))
    }
})