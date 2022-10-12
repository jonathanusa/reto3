URL_SERVER = "http://localhost:8080"

// Función para cargar las vistas de cada tabla de manera independiente
function direccionarPagina(id_pag){
    let page_name = ["barcos.html", "categorias.html", "clientes.html", "mensajes.html", "reservaciones.html", "calificaciones.html", "usuariosAdmin.html"];
    $( "#includeContent" ).load( page_name[id_pag], function( response, status, xhr ) {

        if( page_name[id_pag] == "barcos.html" ){
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
        else if( page_name[id_pag] == "mensajes.html" ){
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
                        alert('Preferiblemente debe ingresar primero clientes para ingresar un mensaje');
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
            $.ajax({
                url : URL_SERVER + "/api/Boat/" + "all",
                type : 'GET',
                dataType : 'JSON',
                success : function(respuesta) {
                    if( !respuesta.length ){
                        alert('Preferiblemente debe ingresar primero botes para ingresar un mensaje');
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
                        alert('Preferiblemente debe ingresar primero clientes para realizar una reserva');
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

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarBarcos(items){
    let myTable =  '<tr>\
                        <th>NAME</th>\
                        <th>BRAND</th>\
                        <th>YEAR</th>\
                        <th>DESCRIPTION</th>\
                        <th>CATEGORY</th>\
                    </tr>';
// #
    $("#boatTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].year + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td>" + items[i].category.name + "</td>";
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

// Función para crear una tabla con los elementos ordenados en la vista

// #
function listarCategorias(items){
    let myTable =  '<tr>\
                        <th>NAME</th>\
                        <th>DESCRIPTION</th>\
                        <th>BOATS</th>\
                    </tr>';
    $("#categoryTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
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