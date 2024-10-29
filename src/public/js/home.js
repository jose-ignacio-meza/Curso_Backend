console.log('Se conecto el js desde el home')

const socket=io()

socket.on("nuevoProducto", product=>{
    console.log('estoy en el on')
    let contenedor = document.getElementById("productosNuevos")
    contenedor.textContent= product.tittle
    console.log(product)
    location.reload();
})

function VerMas(){

}