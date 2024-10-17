import express from 'express'
import Router from 'express'
import {router as routerProducts} from './routes/productsRouter.js'
import {router as routerCarts} from './routes/cartsRouter.js'


const app=express()
const server = app.listen(8080,()=>console.log('escuchando al puerto 8080'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/prducts",routerProducts)
app.use("/api/carts",routerCarts)

