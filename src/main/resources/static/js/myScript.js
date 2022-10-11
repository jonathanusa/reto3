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

// POST Barcos

// #
function postBoat(){

    // #
    // Definición estructura de datos para recuperar valores desde el html
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
            + items[i].boats[index].name
            + "; " 
            + items[i].boats[index].brand 
            + "; " 
            + items[i].boats[index].year
            + "; " 
            + items[i].boats[index].description
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

