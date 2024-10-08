import ProductManager from "./dao/ProductManager.js";

let product1={tittle:"Paseo",description:"Galletitas crackers",price:26,thumbnail:"Foto Producto",code:6,stock:20}
let product2={tittle:"Cerveza",description:"Bebida alcoholica a base de cebada",price:40,thumbnail:"Foto Producto",code:66,stock:80}
let product3={tittle:"Pan",description:"Panificado",price:15,thumbnail:"Foto Producto",code:45,stock:20}
let product4={tittle:"",description:"Panificado",price:15,thumbnail:"Foto Producto",code:45,stock:20}
let product5={tittle:"Pizetas",description:"Panificados",price:7,thumbnail:"Foto Producto",code:21,stock:60}

let nuevoProductManager= new ProductManager()
await nuevoProductManager.loadProducts()
nuevoProductManager.getProducts()
nuevoProductManager.getProductById(4)
await nuevoProductManager.deleteProduct(8)
// nuevoProductManager.addProduct(product2)
// nuevoProductManager.addProduct(product5)
// nuevoProductManager.addProduct(product4)
// nuevoProductManager.addProduct(product5)