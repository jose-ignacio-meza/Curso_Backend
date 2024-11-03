import express from 'express'
import Router from 'express'
import { router as routerProducts} from './routes/productsRouter.js'
import { router as routerCarts} from './routes/cartsRouter.js'
import { Server} from 'socket.io'
import { engine } from 'express-handlebars'
import { viewsRouter } from './routes/viewsRouter.js'

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Configuracion de handlebars//
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Configuracion de rutas//
app.use("/api/products",
        (req,res,next)=>{
        req.io=io
        next()},
        routerProducts)
app.use("/api/carts",routerCarts)
app.use("/", viewsRouter)

const server = app.listen(8080,()=>console.log('escuchando al puerto 8080'))
const io = new Server(server)

io.on("connection", socket=>{
    console.log('Se conecto el cliente con ID: '+socket.id)
})


