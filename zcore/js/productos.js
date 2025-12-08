
function zCoreNextProducts() {
    parent.$("#listaProductos").html("");
    zcate = parent.$('#cate').val();
    zsubcate = parent.$('#subcate').val();


    var nuevaURL = "/productos/" + zcate + "/" + zsubcate;
    history.pushState(null, null, nuevaURL);

    $.ajax({
        url: '../../zcore/api/apiproductos',
        type: 'POST',
        contentType: 'application/json', // Establecer el tipo de contenido como JSON
        data: JSON.stringify({
            cate: zcate,
            subcate: zsubcate
        }), // Convertir los datos a formato JSON
        success: function (response) {
            //var jsonResponse = JSON.parse(response);
            var jsonResponse = response;
            if (jsonResponse.length > 0) {
                
                jsonResponse.forEach(function (item) {     
                    var hotValueAsString = item["hot"].toString();

                    var articuloCat = '<div class="col-6 col-md-3"><div class="product_wrappers_one"><div class="thumb"><a href="/producto/' + item["urlf"] + '" class="image"><img src="/img/productos/' + item["id"] + '/1.jpg" alt="Product" /><img class="hover-image" src="/img/productos/' + item["id"] + '/1.jpg" alt="Product" /></a>';

                    if (hotValueAsString === "1") {
                        // PARTIR AQUI: Agrega la l�nea solo si hot est� en 0
                        articuloCat += '<span class="badges" style="background-color:red"><span class="hot" style="background-color:red">Hot</span></span>';
                    }

                    articuloCat += '<a href="/producto/' + item["urlf"] + '" title="ver..." class="add-to-cart offcanvas-toggle">ver...</a></div><div class="content"><span class="title text-muted"><small>' + item["subcate"] + '</small></span><h5 class="title"><a href="/producto/' + item["urlf"] + '">' + item["nombre"] + '</a></h5>';

                    // Verifica si hot es diferente de 0
                    if (hotValueAsString !== "0") {
                        articuloCat += '<span><del class="old" style="color:red"><strong>$' + item["promo"] + '</strong></del><span class="new" style="padding-left:5px"><strong>$' + item["precio"] + '</strong></span></span>';
                    } else {
                        articuloCat += '<span class="new"><strong>$' + item["precio"] + '</strong></span>';
                    }

                    articuloCat += '</div></div></div>';

                    parent.$("#listaProductos").append(articuloCat);
                });
            } else {
                // C�digo para manejar la respuesta vac�a si es necesario
            }
        },
        error: function (xhr, status, error) {
            // Bloque para manejar errores
            console.log("Error en la solicitud:");
            console.log("Estado: " + status);
            console.log("Mensaje de error: " + error);
            // Puedes agregar acciones adicionales aqu�, como mostrar un mensaje al usuario
        }
    });
}     