function datosBasicos(){
    $.ajax({
        url:"https://g466d6ecb122158-pycomputadoras.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:'JSON',
        contentType:"application/JSON",

        success: function(respuesta){
            mostrarRespuesta(respuesta.items);
        },
        error:function (xhr,status){
            console.log(status)
        }
    });
}

function mostrarRespuesta(items){

    $("#userstable").remove();
    var myTable= `<table class="table table-bordered" "id="userstable" border="1">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>AGE</th>
                <th colspan="2">ACCIONES</th>
            </tr>`;    
    
    for(i=0;i<items.length;i++){
        myTable+=`<tr>
                    <td>${items[i].id}</td>
                    <td>${items[i].name}</td>
                    <td>${items[i].email}</td>
                    <td>${items[i].age}</td>
                    <td><button onclick="eliminarDatos(${items[i].id})">Borrar</td>
                    <td><button onclick="editarInformacion(${items[i].id})">Editar</td>
                 </tr>`;
    }
    myTable+=`</table>`;
    $("#resultado").append(myTable);
}

function Agregar() {

    console.log("Inicia Agregado");
    let datos2={
        id:$("#numid").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    
    console.log(datos2);

    $.ajax({
        type:"POST",
        url:"https://g466d6ecb122158-pycomputadoras.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        data: datos2,
        datatype:'JSON',
        traditional: true,
        
        // contentType:"application.JSON",

        success: function(respuesta){
        datosBasicos(); 
        alert("Datos Agregados Correctamente");
        },
        error:function (xhr,status){
            console.log(status);
        }
    });
}

//$(document).ready(function () {
    //editarInformacion();
    //$("#btnGuardarEdicion").hide();
//});

function editarInformacion(numid) {

    $("#numid").prop("disabled", true);
    OcultarBotones(true);
    $.ajax({
        url: `https://g466d6ecb122158-pycomputadoras.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/${numid}`,
        type:"GET",
        datatype:'JSON',
        contentType:"application/JSON",

        success: function(respuesta){
            var items=respuesta.items;
            // $("#resultado").empty();
            $("#numid").val(items[0].id),
            $("#name").val(items[0].name),
            $("#email").val(items[0].email),
            $("#age").val(items[0].age)
        },
        error:function (xhr,status){
            console.log(status)
        }
    });
}

function actualizar(){
    let datos = {        
        id: $("#numid").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val()
        }
        console.log(datos);
        let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"https://g466d6ecb122158-pycomputadoras.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        data: datosPeticion,
        type:'PUT',
        datatype:'JSON',
        contentType:"application/JSON",

        success:function (respuesta){
            $("resultado").empty();
            $("#numid").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age");
            datosBasicos();     
            $("#numid").prop('disabled',false);
            OcultarBotones(false);
            console.log("Actualizado");
        },
        error:function (xhr,status){
            console.log(status);
        }
    });
}

function eliminarDatos(idelement) {
    console.log("Borrar");
    var datos={
        id:idelement
    }
    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url: `https://g466d6ecb122158-pycomputadoras.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client`,
        data:datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success: function (respuesta) {
            datosBasicos();
            alert("Elemento Borrado");
        },
        error: function (xhr, status) {
            console.log(status)
        }
    });
}

function Cancelar()
{
    OcultarBotones(false);
}

function OcultarBotones(hidenbtn)
{  
    if(hidenbtn)
    {
        $("#btnConsultar").hide();
        $("#btnAgregar").hide();
        $("#btnEditar").show();
        $("#btnCancelar").show();
        return;
    } 
    $("#btnEditar").hide();
    $("#btnCancelar").hide();
    $("#btnConsultar").show();
    $("#btnAgregar").show();
}