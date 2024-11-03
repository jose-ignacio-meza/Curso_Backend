console.log('Se conecto el js desde el home')

const socket=io()

function crearTarjetaProducto(producto) {
    // Crear contenedor principal de la tarjeta
    const tarjetaDiv = document.createElement("div");
    tarjetaDiv.classList.add("tarjetaProducto");
  
    // Crear contenedor para título y categoría
    const contenedorTituloYCategoria = document.createElement("div");
    contenedorTituloYCategoria.classList.add("contenedorTituloYCategoriaProducto");
  
    const tituloDiv = document.createElement("div");
    tituloDiv.classList.add("tituloProducto");
    tituloDiv.textContent = producto.tittle;
  
    const categoriaDiv = document.createElement("div");
    categoriaDiv.classList.add("categoriaProducto");
    categoriaDiv.textContent = `Categoria: ${producto.category}`;
  
    contenedorTituloYCategoria.appendChild(tituloDiv);
    contenedorTituloYCategoria.appendChild(categoriaDiv);
    tarjetaDiv.appendChild(contenedorTituloYCategoria);
  
    // Crear contenedor para las fotos
    const contenedorFotos = document.createElement("div");
    contenedorFotos.classList.add("contenedorFotosProducto");
  
    if (producto.thumbnail && producto.thumbnail.length > 0) {
      // Si hay múltiples fotos
      producto.thumbnail.forEach((foto) => {
        const img = document.createElement("img");
        img.src = `/fotosProductos/${foto}`;
        contenedorFotos.appendChild(img);
      });
    } else {
      // Si no hay fotos
      contenedorFotos.textContent = "No hay foto";
    }
    tarjetaDiv.appendChild(contenedorFotos);
  
    // Crear contenedor para la descripción
    const descripcionDiv = document.createElement("div");
    descripcionDiv.classList.add("contenedorDescripcionProducto");
    descripcionDiv.textContent = producto.description;
    tarjetaDiv.appendChild(descripcionDiv);
  
    // Crear botón de enlace
    const button = document.createElement("button");
    button.style.marginLeft = "10%";
    button.style.width = "80%";
    button.style.borderRadius = "15px";
  
    const enlace = document.createElement("a");
    enlace.classList.add("enlace");
    enlace.href = `/product/${producto.id}`;
    enlace.textContent = "Ver Mas";
  
    button.appendChild(enlace);
    tarjetaDiv.appendChild(button);
  
    return tarjetaDiv;
  }

socket.on("nuevoProducto", product=>{
    const contenedorTarjetas = document.getElementById("contenedorProductos");
    if (contenedorTarjetas) {
        const nuevaTarjeta = crearTarjetaProducto(product)
        contenedorTarjetas.appendChild(nuevaTarjeta);
      } else {
        console.error("No se encontró el contenedor con la clase 'contenedorProductos'");
      }

    // console.log('estoy en el on')
    // let contenedor = document.getElementById("productosNuevos")
    // contenedor.textContent= product.tittle
    // console.log(product)
    // location.reload();
})

function VerMas(){

}