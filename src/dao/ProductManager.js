import fs from "fs/promises"

export default class ProductManager {
    
    static #products=[]
    static #ruta = './src/data/products.json'
    
    constructor() {
    
    }

    // Cargar productos desde el archivo JSON
    async loadProducts() {
        try {
            const data = await fs.readFile(ProductManager.#ruta, 'utf-8');
            ProductManager.#products = JSON.parse(data) || [];
            console.log("se cargaron los productos desde el json un total "+ ProductManager.#products.length+" productos.")
        } catch (err) {
            console.log("No se pudo cargar el archivo, comenzando con un arreglo vacío.");
            ProductManager.#products = [];
        }
    }

    //Nos devuelve el valor que hay que asignar al ultimo id
    static UltimoId (){
        if(this.#products.length == 0){
            let ultimoId= 1
            return ultimoId
        }
        //Busco el ultimo elemento
        let ultimoElemento= this.#products.length -1
        let ultimoId = this.#products[ultimoElemento].id
        return ultimoId +1
    }

    //Carga un producto al arreglo de productos
    async addProduct(product){

        //Verifico que tenga un titulo el producto
        if(product.tittle == ""){
            return console.log("El producto debe tener titulo")
        }

        //Verifico si existe
        let existe = ProductManager.#products.find(p=> p.tittle === product.tittle)
        if(existe){
            return console.log(`El producto ${product.tittle} ya existe`)
        }

        //Se asigna el ultimo id y se carga en el arreglo
        let ultimo= ProductManager.UltimoId()
        let newProduct={id:ultimo,...product}        
        ProductManager.#products.push(newProduct)

        //Se carga en el archivo .json
        try {
            await fs.writeFile(ProductManager.#ruta, JSON.stringify(ProductManager.#products, null, 5), 'utf-8');
            console.log("Producto agregado y guardado en el archivo");
        } catch (err) {
            console.error("Hubo un error al guardar el archivo:", err);
        }
        
    }
    
    //Trae todo los productos cargados
    getProducts(){
        ProductManager.#products.forEach(producto => {
            console.log(producto)
        });
    }

    //Busca un Producto por id
    getProductById(id){
        let encontro= false
        ProductManager.#products.forEach(producto=>{
            if(producto.id == id){
                encontro=true
                return console.log(`se encontro el producto es :"${producto.tittle}"`)
            }
        })
        if (!encontro){
            return console.error("Not found")
        }
    }

    async deleteProduct(id){
        const index = ProductManager.#products.findIndex(product => product.id === id);
        
        if (index !== -1) {
            ProductManager.#products.splice(index, 1);

            //Se actualiza el archivo products.json
            try {
                await fs.writeFile(ProductManager.#ruta, JSON.stringify(ProductManager.#products, null, 5), 'utf-8');
                console.log("Producto agregado y guardado en el archivo");
            } catch (err) {
                console.error("Hubo un error al guardar el archivo:", err);
            }
        } else {
            console.log(`No se encontró un producto con id ${id}.`);
        }       
    }
}