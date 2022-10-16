URL_SERVER = "http://localhost:8080"

// Función para cargar las vistas de cada tabla de manera independiente
function direccionarPagina(id_pag){
    let page_name = ["barcos.html", "categorias.html", "clientes.html", "mensajes.html", "reservaciones.html", "usuariosAdmin.html"];
    $( "#includeContent" ).load( page_name[id_pag], function( response, status, xhr ) {

        if( page_name[id_pag] == "barcos.html" ){
            getBoat();
            $.ajax({
                url : URL_SERVER + "/api/Category/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        alert('Preferiblemente debe ingresar primero categorias para ingresar un bote');
                    }
                    var selector_obj = document.getElementById("selector");

                    for (let index = 0; index < respuesta.length; index++) {
                        var options_selector = document.createElement('option')
                        options_selector.innerHTML = respuesta[index].name;
                        options_selector.value = respuesta[index].id;    
                        selector_obj.appendChild(options_selector);
                    }                
                },
                error : function(xhr, status) {
                    alert('Ha sucedido un problema de lectura');
                },
                complete : function(xhr, status) {
                    console.log('Petición completada');
                }
            });
        }
        else if( page_name[id_pag] == "categorias.html" ){
            getCategory();
        }
        else if( page_name[id_pag] == "clientes.html" ){
            getClient();
        }
        else if( page_name[id_pag] == "usuariosAdmin.html" ){
            getAdmin();
        }
        else if( page_name[id_pag] == "mensajes.html" ){
            getMessage()
            $.ajax({
                url : URL_SERVER + "/api/Boat/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        alert('Preferiblemente debe ingresar primero botes para ingresar un mensaje');
                    }
                    var selector_obj = document.getElementById("selector");

                    for (let index = 0; index < respuesta.length; index++) {
                        var options_selector = document.createElement('option')
                        options_selector.innerHTML = respuesta[index].name;
                        options_selector.value = respuesta[index].id;    
                        selector_obj.appendChild(options_selector);
                    }                
                },
                error : function(xhr, status) {
                    alert('Ha sucedido un problema de lectura');
                },
                complete : function(xhr, status) {
                    console.log('Petición completada');
                }
            });

            $.ajax({
                url : URL_SERVER + "/api/Client/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        alert('Preferiblemente debe ingresar primero clientes antes de ingresar un mensaje');
                    }
                    var selector_obj = document.getElementById("selector_clients");

                    for (let index = 0; index < respuesta.length; index++) {
                        var options_selector = document.createElement('option')
                        options_selector.innerHTML = respuesta[index].name;
                        options_selector.value = respuesta[index].idClient;    
                        selector_obj.appendChild(options_selector);
                    }            
                },
                error : function(xhr, status) {
                    alert('Ha sucedido un problema de lectura');
                },
                complete : function(xhr, status) {
                    console.log('Petición completada');
                }
            });
        }
        else if( page_name[id_pag] == "reservaciones.html" ){
            getReservation();
            $.ajax({
                url : URL_SERVER + "/api/Boat/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        alert('Preferiblemente debe ingresar primero botes antes de ingresar un mensaje');
                    }
                    var selector_obj = document.getElementById("selector_boats");

                    for (let index = 0; index < respuesta.length; index++) {
                        var options_selector = document.createElement('option')
                        options_selector.innerHTML = respuesta[index].name;
                        options_selector.value = respuesta[index].id;    
                        selector_obj.appendChild(options_selector);
                    }                
                },
                error : function(xhr, status) {
                    alert('Ha sucedido un problema de lectura');
                },
                complete : function(xhr, status) {
                    console.log('Petición completada');
                }
            });

            $.ajax({
                url : URL_SERVER + "/api/Client/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        alert('Preferiblemente debe ingresar primero clientes antes de realizar una reserva');
                    }
                    var selector_obj = document.getElementById("selector_clients");

                    for (let index = 0; index < respuesta.length; index++) {
                        var options_selector = document.createElement('option')
                        options_selector.innerHTML = respuesta[index].name;
                        options_selector.value = respuesta[index].idClient;    
                        selector_obj.appendChild(options_selector);
                    }            
                },
                error : function(xhr, status) {
                    alert('Ha sucedido un problema de lectura');
                },
                complete : function(xhr, status) {
                    console.log('Petición completada');
                }
            });

            $.ajax({
                url : URL_SERVER + "/api/Score/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        fillScoreTable(0);
                    }          
                },
                error : function(xhr, status) {
                    alert('Ha sucedido un problema de lectura');
                },
                complete : function(xhr, status) {
                    console.log('Petición completada');
                }
            });
        }
        
    });

    for (let index = 0; index < page_name.length; index++) {
        if (id_pag == index){
            $("#pes_"+index).attr({'style':'background-color: #04AA6D'})
        }
        else{
            $("#pes_"+index).attr({'style':'background-color: #333'})
        }        
    }   
}

function fillScoreTable(index){

    if( index > 5 ){
        console.log('Tabla score inicializada correctamente')
        return;
    }

    else{

        let myData ={
            score: index
        };

        let dataToSend = JSON.stringify(myData);

        $.ajax({
    // #
            url : URL_SERVER + "/api/Score/" + "save",
            type : 'POST',
            dataType: '',
            data: dataToSend,
            contentType: 'application/json',

            success : function(result,status,xhr) {
    // #
                console.log('Guardado exitoso de score ', index);
            },
            error : function(xhr,status,error) {
                alert('Ha sucedido un problema en guardar un registro en la tabla');
            },
            complete : function(result,status) {
                console.log('Guardado completado');
                fillScoreTable(++index);
            }
        });
    }
}

/****************************
** METODOS DE LA TABLA BOAT *
*****************************/
// Petición GET

// #
function getBoat(){
    $.ajax({
// #
        url : URL_SERVER + "/api/Boat/" + "all",
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de la tabla realizada con éxito');
            const listaOrdenada = respuesta.sort(function(a, b){return a.id - b.id });
// #        
            listarBarcos(listaOrdenada);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de la tabla');
        },
        complete : function(xhr, status) {
            console.log('Petición completada');
        }
    });
}

// Petición GET con elemento particular
function getBoatId( id ){
    $.ajax({
        url : URL_SERVER + "/api/Boat/" + id,
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {

            alert('Lectura del elemento realizada con exito');

            $("#id_update").val(respuesta.id);

            $("#name_update").val(respuesta.name);$('#name_update').prop('disabled', false);
            $("#brand_update").val(respuesta.brand);$('#brand_update').prop('disabled', false);
            $("#year_update").val(respuesta.year);$('#year_update').prop('disabled', false);
            $("#description_update").val(respuesta.description);$('#description_update').prop('disabled', false);
            $("#category_update").val(respuesta.category.name);
            $('#btnUpdate').prop('disabled', false);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura del elemento');
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de elemento completada');
        }
    });
}

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarBarcos(items){
    let myTable =  '<tr>\
                        <th>NAME</th>\
                        <th>BRAND</th>\
                        <th>YEAR</th>\
                        <th>DESCRIPTION</th>\
                        <th>CATEGORY</th>\
                        <th>DELETE</th>\
                    </tr>';
// #
    $("#boatTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td> <a href=\"javascript:getBoatId(" + items[i].id + ");\">" + items[i].name + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].year + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td>" + items[i].category.name + "</td>";
        myTable += "<td> <button class=\"btnDelete\" onclick='deleteBoat(" + items[i].id + ")'> Borrar </button></td>";
        myTable += "</tr>";
    }
// #
    $("#boatTable").append(myTable);
}

// Petición POST

// #
function postBoat(){

    // #
    // Definición estructura de datos para recuperar valores desde el html
    if( $("#name").val() != '' ){
        let myData ={
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description").val(),
            category: { "id": parseInt( $("#selector option:selected").val() , 10)}
        };

        let dataToSend = JSON.stringify(myData);

        $.ajax({
    // #
            url : URL_SERVER + "/api/Boat/" + "save",
            type : 'POST',
            dataType: '',
            data: dataToSend,
            contentType: 'application/json',

            success : function(result,status,xhr) {
                $("#name").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description").val("");
    // #
                getBoat();
                alert('Guardado exitoso de registro en la tabla');
            },
            error : function(xhr,status,error) {
                alert('Ha sucedido un problema en guardar un registro en la tabla');
            },
            complete : function(result,status) {
                console.log('Guardado completado');
            }
        });
    }
    else{
        alert("Debe ingresar al menos el nombre del barco para ser creado")
    }
}

// Petición PUT
function updateBoat(){

    let myData ={
        id: parseInt( $("#id_update").val(), 10),
        name: $("#name_update").val(),
        brand: $("#brand_update").val(),
        year: parseInt( $("#year_update").val(), 10),
        description: $("#description_update").val()
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : URL_SERVER + "/api/Boat/" + "update",
        type : 'PUT',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id_update").val("");
            $("#name_update").val("");$('#name_update').prop('disabled', true);
            $("#brand_update").val("");$('#brand_update').prop('disabled', true);
            $("#year_update").val("");$('#year_update').prop('disabled', true);
            $("#description_update").val("");$('#description_update').prop('disabled', true);
            $("#category_update").val("");

            $('#btnUpdate').prop('disabled', true);

            alert('Petición de actualización realizada con éxito');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en actualizar');
        },
        complete : function(result,status) {
            getBoat();
            console.log('Actualizar completado');
        }
    });
}

// Petición DELETE
function deleteBoat( id ){
    $.ajax({
        url : URL_SERVER + "/api/Boat/" + id,
        type : 'DELETE',
        dataType : 'JSON',
        contentType: 'application/json',
        success : function(respuesta) {
            alert('Eliminación exitosa de registro')
            getBoat();
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema al eliminar un registro');
        },
        complete : function(xhr, status) {
            console.log('Petición completada al eliminar un registro');
        }
    });
}

/********************************
** METODOS DE LA TABLA CATEGORY *
*********************************/
// Petición GET

// #
function getCategory(){
    $.ajax({
// #
        url : URL_SERVER + "/api/Category/" + "all",
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de la tabla realizada con éxito');
            const listaOrdenada = respuesta.sort(function(a, b){return a.id - b.id });
            // #
            listarCategorias(listaOrdenada);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de la tabla');
        },
        complete : function(xhr, status) {
            console.log('Petición completada');
        }
    });
}

// Petición GET con elemento particular
function getCategoryId( id ){
    $.ajax({
        url : URL_SERVER + "/api/Category/" + id,
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {

            alert('Lectura del elemento realizada con exito');

            $("#id_update").val(respuesta.id);

            $("#name_update").val(respuesta.name);$('#name_update').prop('disabled', false);
            $("#description_update").val(respuesta.description);$('#description_update').prop('disabled', false);
            $('#btnUpdate').prop('disabled', false);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura del elemento');
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de elemento completada');
        }
    });
}

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarCategorias(items){
    let myTable =  '<tr>\
                        <th>NAME</th>\
                        <th>DESCRIPTION</th>\
                        <th>BOATS</th>\
                        <th>DELETE</th>\
                    </tr>';
    $("#categoryTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td> <a href=\"javascript:getCategoryId(" + items[i].id + ");\">" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td>";

        for (let index = 0; index < items[i].boats.length; index++) {
            myTable += "<p>" 
            + "<strong>name: </strong>" + items[i].boats[index].name
            + "; " 
            + "<strong>brand: </strong>" + items[i].boats[index].brand 
            + "; " 
            + "<strong>year: </strong>" + items[i].boats[index].year
            + "; " 
            + "<strong>description: </strong>" + items[i].boats[index].description
            + "</p>";
        }
        myTable += "</td>";
        myTable += "<td> <button class=\"btnDelete\" onclick='deleteCategory(" + items[i].id + ")'> Borrar </button></td>";

        myTable += "</tr>";        
    }

    $("#categoryTable").append(myTable);
}

// Petición POST

// #
function postCategory(){

    // #
    // Definición estructura de datos para recuperar valores desde el html
    if( $("#name").val() != '' ){
        let myData ={
            name: $("#name").val(),
            description: $("#description").val(),
        };

        let dataToSend = JSON.stringify(myData);

        $.ajax({
    // #
            url : URL_SERVER + "/api/Category/" + "save",
            type : 'POST',
            dataType: '',
            data: dataToSend,
            contentType: 'application/json',

            success : function(result,status,xhr) {
                $("#name").val("");
                $("#description").val("");
    // #
                getCategory();
                alert('Guardado exitoso de registro en la tabla');
            },
            error : function(xhr,status,error) {
                alert('Ha sucedido un problema en guardar un registro en la tabla');
            },
            complete : function(result,status) {
                console.log('Guardado completado');
            }
        });
    }
    else{
        alert("Debe ingresar al menos el nombre de la categoria para ser creada")
    }
}

// Petición PUT
function updateCategory(){

    let myData ={
        id: parseInt( $("#id_update").val(), 10),
        name: $("#name_update").val(),
        description: $("#description_update").val()
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : URL_SERVER + "/api/Category/" + "update",
        type : 'PUT',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id_update").val("");
            $("#name_update").val("");$('#name_update').prop('disabled', true);
            $("#description_update").val("");$('#description_update').prop('disabled', true);

            $('#btnUpdate').prop('disabled', true);

            alert('Petición de actualización realizada con éxito');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en actualizar');
        },
        complete : function(result,status) {
            getCategory();
            console.log('Actualizar completado');
        }
    });
}

// Petición DELETE
function deleteCategory( id ){
    $.ajax({
        url : URL_SERVER + "/api/Category/" + id,
        type : 'DELETE',
        dataType : 'JSON',
        contentType: 'application/json',
        success : function(respuesta) {
            alert('Eliminación exitosa de registro')
            getCategory();
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema al eliminar un registro');
        },
        complete : function(xhr, status) {
            console.log('Petición completada al eliminar un registro');
        }
    });
}

/******************************
** METODOS DE LA TABLA CLIENT *
*******************************/
// Petición GET

// #
function getClient(){
    $.ajax({
// #
        url : URL_SERVER + "/api/Client/" + "all",
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de la tabla realizada con éxito');
            const listaOrdenada = respuesta.sort(function(a, b){return a.id - b.id });
// #        
            listarClientes(listaOrdenada);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de la tabla');
        },
        complete : function(xhr, status) {
            console.log('Petición completada');
        }
    });
}

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarClientes(items){
    let myTable =  '<tr>\
                        <th>NAME</th>\
                        <th>EMAIL</th>\
                        <th>AGE</th>\
                    </tr>';
// #
    $("#clientTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "</tr>";
    }
// #
    $("#clientTable").append(myTable);
}

// POST

// #
function postClient(){

// #
    // Definición estructura de datos para recuperar valores desde el html
    if( $("#name").val() != '' ){
        let myData ={
            name: $("#name").val(),
            email: $("#email").val(),
            age: $("#age").val(),
            password: $("#password").val()
        };

        let dataToSend = JSON.stringify(myData);

        $.ajax({
    // #
            url : URL_SERVER + "/api/Client/" + "save",
            type : 'POST',
            dataType: '',
            data: dataToSend,
            contentType: 'application/json',

            success : function(result,status,xhr) {
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                $("#password").val("");
    // #
                getClient();
                alert('Guardado exitoso de registro en la tabla');
            },
            error : function(xhr,status,error) {
                alert('Ha sucedido un problema en guardar un registro en la tabla');
            },
            complete : function(result,status) {
                console.log('Guardado completado');
            }
        });
    }
    else{
        alert("Debe ingresar al menos el nombre")
    }
}

/*******************************
** METODOS DE LA TABLA MESSAGE *
********************************/
// Petición GET

// #
function getMessage(){
    $.ajax({
// #
        url : URL_SERVER + "/api/Message/" + "all",
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de la tabla realizada con éxito');
            const listaOrdenada = respuesta.sort(function(a, b){return a.id - b.id });
// #        
            listarMensajes(listaOrdenada);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de la tabla');
        },
        complete : function(xhr, status) {
            console.log('Petición completada');
        }
    });
}

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarMensajes(items){
    let myTable =  '<tr>\
                        <th>MESSAGE</th>\
                        <th>BOATS</th>\
                        <th>CLIENTS</th>\
                    </tr>';
// #
    $("#messageTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td>" + "<strong>name: </strong>" + items[i].boat.name + "; " 
                          + "<strong>brand: </strong>" + items[i].boat.brand + "; "
                          + "<strong>year: </strong>" + items[i].boat.year + "; "
                          + "<strong>description: </strong>" + items[i].boat.description
                          + "</td>";
        myTable += "<td>" + "<strong>name: </strong>" + items[i].client.name + "; " 
                          + "<strong>email: </strong>" + items[i].client.email + "; "
                          + "<strong>age: </strong>" + items[i].client.age
                          + "</td>";
        myTable += "</tr>";
    }
// #
    $("#messageTable").append(myTable);
}

// POST

// #
function postMessage(){

// #
    // Definición estructura de datos para recuperar valores desde el html
    if( $("#messageText").val() != '' ){
        let myData ={
            messageText: $("#messageText").val(),
            boat: { "id": parseInt( $("#selector option:selected").val() , 10)},
            client: { "idClient": parseInt( $("#selector_clients option:selected").val() , 10)}
        };

        let dataToSend = JSON.stringify(myData);

        $.ajax({
    // #
            url : URL_SERVER + "/api/Message/" + "save",
            type : 'POST',
            dataType: '',
            data: dataToSend,
            contentType: 'application/json',

            success : function(result,status,xhr) {
                $("#messageText").val("");
    // #
                getMessage();
                alert('Guardado exitoso de registro en la tabla');
            },
            error : function(xhr,status,error) {
                alert('Ha sucedido un problema en guardar un registro en la tabla');
            },
            complete : function(result,status) {
                console.log('Guardado completado');
            }
        });
    }
    else{
        alert("Ingrese un mensaje para registrar en el sistema")
    }
}

/***********************************
** METODOS DE LA TABLA RESERVATION *
************************************/
// Petición GET

// #
function getReservation(){
    $.ajax({
// #
        url : URL_SERVER + "/api/Reservation/" + "all",
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de la tabla realizada con éxito');
            const listaOrdenada = respuesta.sort(function(a, b){return a.id - b.id });
// #        
            listarReservaciones(listaOrdenada);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de la tabla');
        },
        complete : function(xhr, status) {
            console.log('Petición completada');
        }
    });
}

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarReservaciones(items){
    let myTable =  '<tr>\
                        <th>ID</th>\
                        <th>START DATE</th>\
                        <th>DEVOLUTION DATE</th>\
                        <th>STATUS</th>\
                        <th>BOAT</th>\
                        <th>CLIENT</th>\
                        <th>SCORE</th>\
                    </tr>';
// #
    $("#reservationTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idReservation + "</td>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable += "<td>" + items[i].status + "</td>";
        myTable += "<td>" + "<strong>name: </strong>" + items[i].boat.name
                          + "</td>";
        myTable += "<td>" + "<strong>name: </strong>" + items[i].client.name + "; " 
                          + "<strong>email: </strong>" + items[i].client.email
                          + "</td>";
        
        if( items[i].score == null ){
            myTable += "<td>" + "N/A" + "</td>";
        }
        else{
            myTable += "<td>" + items[i].score.score + "</td>";
        }
        myTable += "</tr>";
    }
// #
    $("#reservationTable").append(myTable);
}

// POST

// #
function postReservation(){

// #
    // Definición estructura de datos para recuperar valores desde el html
    var score_selector = $("#selector_score option:selected").val();
    let myData;
    if( score_selector == 'N/A' ){
        myData ={
            devolutionDate: $('#devolution_date').val(),
            boat: { "id": parseInt( $("#selector_boats option:selected").val() , 10)},
            client: { "idClient": parseInt( $("#selector_clients option:selected").val() , 10)},
        };
    }
    else{
        myData ={
            devolutionDate: $('#devolution_date').val(),
            boat: { "id": parseInt( $("#selector_boats option:selected").val() , 10)},
            client: { "idClient": parseInt( $("#selector_clients option:selected").val() , 10)},
            score: { "id": parseInt($("#selector_score option:selected").val(), 10)}
        };
    }
    

    let dataToSend = JSON.stringify(myData);

    $.ajax({
// #
        url : URL_SERVER + "/api/Reservation/" + "save",
        type : 'POST',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
// #
            getReservation();
            alert('Guardado exitoso de registro en la tabla');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en guardar un registro en la tabla');
        },
        complete : function(result,status) {
            console.log('Guardado completado');
        }
    });
}

/*****************************
** METODOS DE LA TABLA ADMIN *
******************************/
// Petición GET

// #
function getAdmin(){
    $.ajax({
// #
        url : URL_SERVER + "/api/Admin/" + "all",
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de la tabla realizada con éxito');
            const listaOrdenada = respuesta.sort(function(a, b){return a.id - b.id });
// #        
            listarAdministradores(listaOrdenada);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de la tabla');
        },
        complete : function(xhr, status) {
            console.log('Petición completada');
        }
    });
}

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarAdministradores(items){
    let myTable =  '<tr>\
                        <th>NAME</th>\
                        <th>EMAIL</th>\
                    </tr>';
// #
    $("#adminTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "</tr>";
    }
// #
    $("#adminTable").append(myTable);
}

// POST

// #
function postAdmin(){

// #
    // Definición estructura de datos para recuperar valores desde el html
    if( $("#name").val() != '' ){
        let myData ={
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val()
        };

        let dataToSend = JSON.stringify(myData);

        $.ajax({
    // #
            url : URL_SERVER + "/api/Admin/" + "save",
            type : 'POST',
            dataType: '',
            data: dataToSend,
            contentType: 'application/json',

            success : function(result,status,xhr) {
                $("#name").val("");
                $("#email").val("");
                $("#password").val("");
    // #
                getAdmin();
                alert('Guardado exitoso de registro en la tabla');
            },
            error : function(xhr,status,error) {
                alert('Ha sucedido un problema en guardar un registro en la tabla');
            },
            complete : function(result,status) {
                console.log('Guardado completado');
            }
        });
    }
    else{
        alert("Debe ingresar al menos el nombre")
    }
}