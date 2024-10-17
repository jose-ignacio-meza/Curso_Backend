import fs from 'fs'

export class CartManager{

    static #path='./src/data/carts.json'

    constructor(){

    }

    static setPath(rutaArchivo=""){
        this.#path=rutaArchivo
    }

    static async getProducts(){
        if(fs.existsSync(this.#path)){
            return json.parse(await fs.promises.readFile(this.#path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

}