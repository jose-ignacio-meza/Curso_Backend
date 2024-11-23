import { Router } from "express"
import { ProductsMongoManager as ProductsManager } from "../dao/productsMongoManager.js";
import { CartMongoManager as cartManager} from "../dao/cartMongoManager.js";
import { isValidObjectId } from "mongoose";

export const viewsRouter = Router()

viewsRouter.get("/", async(req,res)=>{
    let {page,limit,category,sort,stock}=  req.query;
    
    page = page && !isNaN(page) ? Number(page) : 1; // Página por defecto es 1 si no es numérica
    limit = limit && !isNaN(limit) ? Number(limit) : 10; // Límite por defecto es 10 si no es numérico
    let sortOption = sort && (sort === "1" || sort === "-1") ? Number(sort) : null; // Validar sort como 1 o -1
    let stockOption = stock === "true"; // Convertir stock en booleano (true/false)
    
    try{
        let {docs:products, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage}= await ProductsManager.getProducts(page,limit,category,sortOption,stockOption)
        res.render("home",
            {products,totalPages, hasNextPage, hasPrevPage, prevPage, nextPage,category,stockOption,page})
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

viewsRouter.get("/carts/:cid", async (req,res)=>{
    let {cid}= req.params
    if(!isValidObjectId(cid)){
        let error = 'El id '+cid+' no es valido'
        res.render("error",{error})
    }else{
        try{
            let result = await cartManager.getCartById(cid)
            if(!result){
                let error = 'No existe un cart con id '+cid
                res.render("error",{error})
            }
            console.log (result.products)
            let products = result.products
            res.render("cart",{cid,products})
        }catch(err){
            res.status(400).send('El id tiene que ser valido :'+err)
        }
    }
})