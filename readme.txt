#Proyecto de ecommerce desarrollado para el curso Programacion BackEnd I de CoderHouse.#

Descripcion e Implementacion:
Este proyecto contiene todos los endpoint pedidos en la consigna de la entrega final, me tome la libertad de agregar una vista para el usuario, la cual se encuentra dentro de la url "http://localhost:8080/", donde el usuario desde el Front podra interactuar con los endpoint creados,
de esta forma ver los productos, ordenarlos, cambiar de pagina, ver por categoria y ver los que estan en stock.

Tambien se agrego una vista para el cart la cual esta en "http://localhost:8080/carts/<idCart>", pero no es accesible por el home mediante ningun enlace ni boton.

Se utilizo sweet alert para simular la agregacion al carrito, no esta implementado el modulo para que suceda,
pero existe el endpoint totalmente comprobable en Postman, tal como lo pedia el enunciado.

Implemente las comprobaciones de los productos en la base de dato, a la hora de agregar o modificar un producto se verifica que el mismo exista en la colleccion de productos, para luego ser agregado en un nuevo cart o uno indicado por id en los parametros


@Autor: Jose Ignacio Meza