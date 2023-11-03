
let counter= 1;
let seleccione = false;
let respuestaPregunta = 0;
let openModalButton = "";
let helpModal = "";
let closeModal = "";
let numCorrectas = 0;
var timer = 0;
let nivel = 0;
let nivelFinal = 0;
let contadorPreguntas = 9;
let numAyudas = 0;
let idUsuario = 0;
let idMateria = 0;

$(document).ready(function() {
    document.addEventListener('change', function (event) {
        if (event.target.classList.contains('options')) {
            uncheckOtherRadios(event.target.id);
        }
    });
    //cargarEmpleados();
    /*
    $( ".content" ).change(function() {
        alert( "Handler for .change() called." );
      });
      */

    const timerid = document.getElementById('timer');
    timerid.style.display = "none";
        
    $.ajax({
        url: url.url+":"+url.port+"/materias", 
        success: function (response) {
            
            if (response.response.length > 0) {
                const materias = response.response; // La primera entrada contiene las materias

                // Obtener el elemento select por su id
                const selectElement = document.getElementById('materias');
                
                // Iterar sobre las opciones y agregarlas al elemento select
                materias.forEach(function (materia) {
                    
                    const option = document.createElement('option');
                    option.value = materia.id;
                    option.text = materia.nombre;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('No se encontraron materias en la respuesta JSON.');
            }
        },
        error: function (check) {
            
            console.error('Error al cargar las materias.');
        }
    });
    

     

  
  });

  


function cargarQuestionario(idUser) {
    nivel = 0;
    nivelFinal=0;
    numAyudas=0;
    contadorPreguntas=0;
    idUsuario = idUser;
    const selectElement  = document.getElementById("materias");
    const materia = selectElement.value;  
    
    const preguntas = "";
    const respuesta = "";
    
    $.ajax({
        type: "GET",
        url: url.url+":"+url.port+"/nivelmateria/"+idUser+"/"+materia,
        async: false,
        headers: {
            "Content-Type": "application/json" // Set the Content-Type header
           
        },
        success: function (response) {
            
            nivel = response.response[0].nivel;
        
        },
        error: function (error) {
            console.log("Error:", error);
        }

    });


    
    $("#questionario").load("questionario.php",function(){
        
        let selectPreguntas ="";
        let opcionRespuestas ="";
        $.ajax({
            type: "GET",
            url: url.url+":"+url.port+"/preguntas/"+materia+"/"+nivel,
            async: false,
            success: function (response) {
                
                const preguntas = response.preguntas.pregunta;
                const respuestas = response.preguntas.respuestas;
                const ayuda        = response.preguntas.ayuda;
                respuestaPregunta =  response.preguntas.correcta;
                selectPreguntas = document.getElementById("pregunta");
                selectPreguntas.textContent  = counter+"- "+preguntas;
                
                ayudaPreguntas = document.getElementById("idayuda");
                ayudaPreguntas.textContent = ayuda;

                
                const answerOptionsContainer = document.getElementById("options");
                answerOptionsContainer.innerHTML = ""; // Clear existing options
                respuestas.forEach(function (respuesta, index) {
                    const label = document.createElement("label");
                    label.className = "options";
                    label.textContent = respuesta.res;
    
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = "radio"; // Assuming all options belong to the same question
                    input.id   = (index+1);
    
                    const checkmark = document.createElement("span");
                    checkmark.className = "checkmark";
    
                    label.appendChild(input);
                    label.appendChild(checkmark);
    
                    answerOptionsContainer.appendChild(label);
                });
                //cargarPreguntas(preguntas[0]);
            },
            error: function (error) {
                console.log("Error:", error);
            }

        });

    openModalButton = document.getElementById("openModalButton");
     helpModal = document.getElementById("helpModal");
     closeModal = document.getElementById("closeModal");
  
    // Open the modal when the button is clicked
    openModalButton.addEventListener("click", function () {
        numAyudas++;
      helpModal.style.display = "block";
    });
  
    // Close the modal when the close button is clicked
    closeModal.addEventListener("click", function () {
      helpModal.style.display = "none";
    });
  
    // Close the modal if the user clicks outside of it
    window.addEventListener("click", function (event) {
      if (event.target === helpModal) {
        helpModal.style.display = "none";
      }
    });
 

    
    });

    var h1Element = document.querySelector('h1');
    var selectElementmateria = document.querySelector('#materias');
    var buttonElement = document.querySelector('#loadTestButton');
    const timerid = document.getElementById('timer');
    timerid.style.display = "block";
    startTimer("timer");
    h1Element.style.display = 'none';
    selectElementmateria.style.display = 'none';
    buttonElement.style.display = 'none';


}
function obtenerRespuestaSeleccionada() {
    var opcionA = document.getElementById('1');
    var opcionB = document.getElementById('2');
    var opcionC = document.getElementById('3');
    var opcionD = document.getElementById('4');

    var selectedOption;

    if (opcionA.checked) {
        selectedOption = 1;
    } else if (opcionB.checked) {
        selectedOption = 2;
    } else if (opcionC.checked) {
        selectedOption = 3;
    } else if (opcionD.checked) {
        selectedOption = 4;
    } else {
        selectedOption = 0;
    }

   return selectedOption;
}

function checarRespuesta(respSeleccionada){
    contadorPreguntas++;
    if(respSeleccionada == respuestaPregunta){
        numCorrectas++;
    }

}

function terminarExamen() {
    var json = {
        "consecuencia": "nivel",
        "input": [
            {
                "nombre": "tiempo",
                "valor": timer
            },
            {
                "nombre": "respuesta",
                "valor": numCorrectas
            },
            {
                "nombre": "ayuda",
                "valor": numAyudas
            }
        ]
    };

    $.ajax({
        type: "POST",
        url: url.url+":"+url.port+"/fuzzy",
        async: false,
        data: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            "Content-Length": JSON.stringify(json).length.toString() // Calculate and set the Content-Length header
        },
        success: function (response) {
            
            nivelFinal = response;
            alert("Felicidades tu nivel es: "+nivelFinal);
        },
        error: function (error) {
            console.log("Error:", error);
        }

    });

    const selectElement  = document.getElementById("materias");
    const materia = selectElement.value;  
    json = {
        "nivel": nivelFinal,
        "idusuario": idUsuario,
        "materia": materia
    };
    $.ajax({
        type: "POST",
        url: url.url+":"+url.port+"/guardarnivel",
        data: JSON.stringify(json),
        async: false,
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            "Content-Length": JSON.stringify(json).length.toString() // Calculate and set the Content-Length header
        },
        success: function (response) {
           alert("datos guardados correctamente");
        },
        error: function (error) {
            console.log("Error:", error);
        }

    });

}

function cargarSiguientePregunta(){
    const respSeleccionada = obtenerRespuestaSeleccionada();
    if(respSeleccionada==0){
        alert("Favor de seleccionar una opcion");
        return;
    }

    if(contadorPreguntas == 10){
        var h1Element = document.querySelector('h1');
        var selectElementmateria = document.querySelector('#materias');
        var buttonElement = document.querySelector('#loadTestButton');
        const timerid = document.getElementById('timer');
        var modaldiv = document.getElementById('quespregunta');
        modaldiv.style.display = "none";
        timerid.style.display = "none";
        h1Element.style.display = 'block';
        selectElementmateria.style.display = 'block';
        buttonElement.style.display = 'block';
        terminarExamen();
        return;
    }
    checarRespuesta(respSeleccionada);
    const selectElement  = document.getElementById("materias");
    const materia = selectElement.value;  
    let selectPreguntas ="";
    let opcionRespuestas ="";
    $.ajax({
        type: "GET",
        url: url.url+":"+url.port+"/preguntas/"+materia+"/"+nivel,
        async: false,
        success: function (response) {
            
            const preguntas = response.preguntas.pregunta;
            const respuestas = response.preguntas.respuestas;
            const ayuda        = response.preguntas.ayuda;
            respuestaPregunta = response.preguntas.correcta;
            selectPreguntas = document.getElementById("pregunta");
            selectPreguntas.textContent  = counter+"- "+preguntas;
            
            ayudaPreguntas = document.getElementById("idayuda");
            ayudaPreguntas.textContent = ayuda;

            
            const answerOptionsContainer = document.getElementById("options");
            answerOptionsContainer.innerHTML = ""; // Clear existing options
            respuestas.forEach(function (respuesta, index) {
                const label = document.createElement("label");
                label.className = "options";
                label.textContent = respuesta.res;

                const input = document.createElement("input");
                input.type = "radio";
                input.name = "radio"; // Assuming all options belong to the same question
                input.id = index + 1;

                const checkmark = document.createElement("span");
                checkmark.className = "checkmark";

                label.appendChild(input);
                label.appendChild(checkmark);

                answerOptionsContainer.appendChild(label);
            });
            
        },
        error: function (error) {
            console.log("Error:", error);
        }

    });
}
function uncheckOtherRadios(selectedRadioId) {
    // Get all radio buttons with the specified class name
    const radioButtons = document.querySelectorAll('.radio-option');

    // Loop through the radio buttons
    radioButtons.forEach((radio) => {
        // Check if the radio button is not the selected one
        if (radio.id !== selectedRadioId) {
            radio.checked = false; // Uncheck the radio button
        }
    });
}

// Example usage to uncheck other radio buttons when one is selected

function startTimer(id) {
    // Hide the elements when the button is pressed
    var h1Element = document.querySelector('h1');
    var selectElement = document.querySelector('#materias');
    var buttonElement = document.querySelector('#loadTestButton');
    var timerElement = document.querySelector('#timer');

    h1Element.style.display = 'none';
    selectElement.style.display = 'none';
    buttonElement.style.display = 'none';

    timer = 0;

    // Display the initial time
    timerElement.innerText = 'Tiempo transcurrido: ' + timer + ' segundos';

    // Start the timer
    var interval = setInterval(function () {
        timer++;

        // Update the timer display
        timerElement.innerText = 'Tiempo transcurrido: ' + timer + ' segundos';
    }, 1000); // Update every 1 second (1000 milliseconds)

   
}





    $(".content").show();
    $(".contentPagos").hide();
     $(".contentMovimientos").hide();
  



function limpíarVariables(){
idEmpleado          = 0;
idMovimiento       = 0;
idEmpleadoRole     = 0;
idEmpleadoTipo     = 0;
nomEmpleadoRole    = '';
nomEmpleadoTipo    = '';


}
    


