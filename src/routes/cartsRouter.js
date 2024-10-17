import {Router} from 'express'

export const router = Router()

router.get("/",(req,res)=>{
    return console.log('hola desde el get cart')
})

router.get("/:id",(req,res)=>{
    return console.log('hola desde el get cart con id')
})
