console.log("conectado el js")


function agregarAlCart(id, tittle){
    
    swal.fire({
        title: "Agregar al carro",
        text: "Se va a agregar al carro "+tittle,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si agregar!"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Agregado!",
                    text: "El producto se agrego correctamente.",
                    icon: "success"
                });
            }
    })
}