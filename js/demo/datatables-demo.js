
$(document).ready(function() {
  $.ajax({ url: url.url+':'+url.port+'/rinkuBack/api/buscarTodosEmpleado',
  type: 'GET',
  dataType: 'json',
success: function(output){
  var selected = [];
      if(Number(output.data.contador) > 0){
         const table = $('#dataTable').DataTable({
          'select': true
        });
        table.row(':eq(0)', {page:'current'}).select();
        $('#dataTable tbody').on('click', 'tr', function () {

          if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            document.getElementById("modBoton").disabled   = true;
            document.getElementById("elimBoton").disabled   = true;
            
            } else {
                document.getElementById("modBoton").disabled   = false;
                 document.getElementById("elimBoton").disabled   = false;
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                }
                //document.getElementById("nuevoBoton").disable 
         });
        
          table.clear();
          let arraydata = [];
          output.data.empleado.forEach(function(obj){
            
              arraydata.push(Object.values(obj));
              
              //console.log(Object.values(obj));
          });
          table.rows.add( arraydata );
          table.draw();
          
      }else{
          alert('Favor de verificar sus datos');
      }
},
error: function(objeto, quepaso, otroobj){

alert('Error al  login');
}							
});

$('.alphaonly').bind('keyup blur',function(){ 
    var node = $(this);
    node.val(node.val().replace(/[^a-z ]/g,'') ); }
);

    const dropchofer = document.getElementById("dropChofer");
    dropchofer.onclick = function(v){
    
    document.getElementById("dropdownMenuButton").innerHTML =  document.getElementById("dropChofer").innerHTML;  
        };

    const dropCargador = document.getElementById("dropCargador");
    dropCargador.onclick = function(v){

    document.getElementById("dropdownMenuButton").innerHTML =  document.getElementById("dropCargador").innerHTML;  
    };


    const dropAux = document.getElementById("dropAux");
    dropAux.onclick = function(v){

    document.getElementById("dropdownMenuButton").innerHTML =  document.getElementById("dropAux").innerHTML;  
    };


});
