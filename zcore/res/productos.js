
function zCoreNextProducts(stCategoria) {
    parent.$("#listaProductos").html("");
    $.ajax({
        url: '/zcore/api/apiproductos',
        type: 'POST',
        contentType: 'application/json', // Establecer el tipo de contenido como JSON
        data: JSON.stringify({ cate: stCategoria }), // Convertir los datos a formato JSON
        success: function (response) {
            var jsonResponse = response;
            if (jsonResponse.length > 0) {
                
                jsonResponse.forEach(function (item) {
                    var articuloCat = '<div class="col-lg-4 col-md-4 col-sm-6 col-12"><div class="product_wrappers_one"><div class="thumb"><a href="/producto/' + item["urlf"] + '" class="image"><img src="/img/productos/' + item["id"] + '/1.jpg" alt="Product" /><img class="hover-image" src="/img/productos/' + item["id"] + '/1.jpg" alt="Product" /></a><a href="/producto/' + item["urlf"] + '" title="ver..." class="add-to-cart offcanvas-toggle">ver...</a></div><div class="content"><h5 class="title"><a href="/producto/' + item["urlf"] + '">' + item["nombre"] + '</a></h5><span class="price"><span class="new"><strong>$' + item["precio"] + '</strong></span></span></div></div></div>';
                    parent.$("#listaProductos").append(articuloCat);
                });
            } else {
                // Código para manejar la respuesta vacía si es necesario
            }
        },
        error: function (xhr, status, error) {
            // Bloque para manejar errores
            console.log("Error en la solicitud:");
            console.log("Estado: " + status);
            console.log("Mensaje de error: " + error);
            // Puedes agregar acciones adicionales aquí, como mostrar un mensaje al usuario
        }
    });
}     