import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

export const router = Router()

ProductManager.loadProducts();

router.get("/",async(req,res)=>{
    let products= await ProductManager.getProducts()
    console.log(products)
    res.status(200).send(products)
})
router.get("/:id", async(req,res)=>{
    let {id}= req.params
    let product =  await ProductManager.getProductById(Number(id))
    if(product == -1){
        res.status(400).send('No existe un producto con id '+id)
    }else{
        res.status(200).send(product)
    }
})

router.post("/", async (req,res)=>{
    let {tittle, description, code, price, stock, category,thumbnail}=req.body
    let product= {tittle:tittle,description:description,code:code, price:price, status:true, stock:stock, category:category, thumbnail:thumbnail}
    try{
        let result= await ProductManager.addProduct(product)
        if(!result){
            res.status(400).send('Ya existe un producto con el code '+code+' cargado')
        }else{
            res.status(200).send('Se cargo el producto: '+ JSON.stringify(product))
        }
    }
    catch(err){
        res.status(400).send('error al cargar el producto: '+ JSON.stringify(product) + ' error : '+err)
    }
    
})

router.put("/:id", async (req,res)=>{
    let {id}= req.params
    let {tittle, description, code, price, stock, category,thumbnail}=req.body
    if(tittle==''){
        res.status(400).send('Debe ingresar un titulo')
    }else{
        let product= {tittle:tittle,description:description,code:code, price:price, status:true, stock:stock, category:category, thumbnail:thumbnail}
        try{
            let result= await ProductManager.modifyProduct(Number(id),product)
            if (!result){
                res.status(400).send('No existe el producto con id :'+id)
            }else{
                res.status(200).send('Se modifico el producto: '+ JSON.stringify(product))
            }
        }
        catch(err){
            res.status(401).send('error al cargar el producto: '+ JSON.stringify(product) + ' error : '+err)
        }
        
    }
})

