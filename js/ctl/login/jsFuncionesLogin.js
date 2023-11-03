


function login() {
    
    const usuario = document.getElementById("usuario").value.replace(/[^a-z]+/i, '');
    const contra = document.getElementById("contra").value.replace(/[^a-z]+/i, '');
   
    $.ajax({
        url: url.url + ':' + url.port + '/login',
        data: JSON.stringify({ "usuario": usuario, "contrasena": contra }),
        type: 'POST',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            "Content-Length": JSON.stringify({ "usuario": usuario, "contrasena": contra }).length.toString() // Calculate and set the Content-Length header
        },
        success: function (output) {
            document.getElementById("nombre").value = output.nombre;
            document.getElementById("nombrepaterno").value = output.apellido_paterno;
            document.getElementById("nombrematerno").value = output.apellido_materno;
            document.getElementById("privilegio").value = output.privilegio;
            document.getElementById("rol").value = output.rol;
            document.getElementById("descripcion").value = output.descripcion;
            document.getElementById("id").value = output.id;
            document.getElementById("formpost").submit();
           
        },
        error: function (objeto, quepaso, otroobj) {
            alert('Error al login2');
        }
    });

}

function llenartabla(){
    cargarEmpleados();
   
    /*
     var table = $('#dataTable').DataTable();
    var data = table.row().data();
  
    table.row('.selected').remove().draw(false);
   
    // Call the dataTables jQuery plugin
var data =[
    {
        "Name":       "Tiger Nixon",
        "Position":   "System Architect",
        "Office":     "Edinburgh",
        "Age":         "30",
        "start": "2011/04/25",
        "Salary":     "$3,120"
    },
    {
        "Name":       "Garrett Winters",
        "Position":   "Director",
        "Office":     "Edinburgh",
        "Age":         "30",
        "Start": "2011/07/25",
        "Salary":     "$5,300"
    }];
   
  var table = $('#dataTable').DataTable();
  table.row(':eq(0)', { page: 'current' }).select();
    table.clear();
    let arraydata = [];
    data.forEach(function(obj){
       
        arraydata.push(Object.values(obj));
        
        //console.log(Object.values(obj));
    });
    table.rows.add( arraydata );
    table.draw();
    dataset = 
        [ "Garrett Winters", "Director", "Edinburgh", "30", "2011/07/25", "$5,300"]
        
    ;
          */
    //Reload/redraw the table with new data
    //table.rows.add( Object.values(dataset) ).draw();
   
    
   // table.draw();


}

function guardarAtr(param1){
	var nivel = document.getElementById("cmbnivel").value;
	nivel = nivel.replace(/[^0-9]/g, '');

	$.ajax({ url: 'admin_tdv/admin_atributos/controlador/agregarAtr.php',
                data: JSON.stringify({"nomEmpleado":  usuario,"apellidoPaterno": contra}),
				type: 'post',
				success: function(output){
					newoutput = output.replace(/[0-9]/g, '');

							alert(newoutput);
							console.log(newoutput);
				}							
	});
};
