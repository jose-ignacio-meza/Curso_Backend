import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

export const router = Router()

router.get("/",async(req,res)=>{
    let products= await ProductManager.getProducts()
    res.status(200).send(console.log(products))
})
router.get("/:id", async(req,res)=>{
    let {id}= req.params
    let product =  await ProductManager.getProductById(id)
    res.status(200).send(product)
})

router.post("/", async (req,res)=>{
    let {tittle, description, price, thumbnail, code, stock}=req.body
    let product= {tittle:tittle,description:description,price:price,thumbnail:thumbnail,code:code,stock:stock}
    try{
        let products= await ProductManager.addProduct(product)
        res.status(200).send('Se cargo el producto: '+ JSON.stringify(product) + 'en Products : ')
    }
    catch(err){
        res.status(401).send('error al cargar el producto: '+ JSON.stringify(product) + ' error : '+err)
    }
    
})

