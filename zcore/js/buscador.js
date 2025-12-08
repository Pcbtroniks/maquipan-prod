$(document).ready(function () {
    var tiempo;
    parent.$('#zBuscador').on('input', function () {
        parent.$('#zBusqueda').html('');
        clearTimeout(tiempo);
        tiempo = setTimeout(function () {
            realizarBusqueda();
        }, 500);
    });

    function realizarBusqueda() {
        var valorBusqueda = parent.$('#zBuscador').val();
        if (valorBusqueda == "") {
            parent.$('#zBusqueda').html('');
        } else {
            $.ajax({
                url: '../../zcore/api/apibuscador',
                type: 'POST',
                data: { busqueda: valorBusqueda },
                success: function (response) {

                    //var jsonResponse = JSON.parse(response);
                    var jsonResponse = response;


                    if (Array.isArray(jsonResponse)) {
                        parent.$('#zBusqueda').html('');
                        $.each(jsonResponse, function (index, item) {
                            parent.$('#zBusqueda').append(`
                                <tr onclick="window.location.href='https://maquipan.com.mx/producto/${item.urlf}'">
                                    <td width="70">
                                        <img width="70" src="/img/productos/${item.id}/1.jpg">
                                    </td>
                                    <td>
                                        ${item.nombre}<br />$${item.precio} mxn
                                    </td>
                                </tr>
                            `);
                        });
                    } else {
                       // console.error("La respuesta no es un array:", response);
                    }
                },
                error: function (xhr, status, error) {
                   // console.error("Error en la solicitud AJAX:", xhr.responseText);
                }
            });
        }
    }

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#zBuscador').length) {
            cerrarBuscador();
        }
    });

    function cerrarBuscador() {
        parent.$('#zBuscador').val('');
        parent.$('#zBusqueda').html('');
    }
});


$(document).ready(function () {
    // Mostrar el botón cuando se desplaza hacia abajo
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('#scrollTopButton').fadeIn();
        } else {
            $('#scrollTopButton').fadeOut();
        }
    });

    // Función para desplazarse al principio de la página
    $('#scrollTopButton').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
});
