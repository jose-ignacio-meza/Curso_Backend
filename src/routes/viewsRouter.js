import { Router } from "express"
import { ProductsMongoManager as ProductsManager } from "../dao/productsMongoManager.js";

export const viewsRouter = Router()

viewsRouter.get("/", async(req,res)=>{
    let {page , limit,category}=  req.query

    try{
        let {docs:products, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage}= await ProductsManager.getProducts(page,limit,category)
        res.render("home",{products,totalPages, hasNextPage, hasPrevPage, prevPage, nextPage,category})
    }catch(err){
        res.status(401).send(console.log('Error al cargar productos, error:'+err))
    }
})

viewsRouter.get("/product/:id", async(req,res)=>{
    let {id} = req.params
    if (id){
        try{
            let product = await ProductsManager.getProductById(id)
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
        res.status(400).send('El id tiene que ser valido :'+err)
    }
})