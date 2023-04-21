// _____________________________ Preparaciones y Variables Globales _____________________________
// Esto retorna un arreglo con todos los inputs check 
const inputsCheck = document.querySelectorAll('.filtros .filtros__checkbox');
let etiquetasModificar = [];
let elementoModificar = "";


// ____________________________________________________________________________________________

// _____________________________ Funciones Varias _____________________________
// Preparar Check en firefox
// El atributo checked no funciona en firefox, por lo que para compatibilidad con todos los navegadores tenemos que marcarlos usando javascript al cargar la pagina. Esto lo hacemos por medio de un for in
function prepararCheck() {
	console.log('Ahuevo triunfo del mal!!!');
	for (let elemento of inputsCheck) {
		elemento.checked = true;
		console.log(elemento.checked);
	}
}

// Funcion Preparar Array
// La funcion recibe el name del input
// La funcion toma un array definido anteriormente y le guarda el nombre de los productos a ocultar
function prepararArray(name) {
	switch (name) {
		// Modificaciones Esteticas
		case "filtroModEsteticas": {
			etiquetasModificar = ['modEstetica1', 'modEstetica2', 'modEstetica3', 'modEstetica4']
			break;
		}
		
		//
		case "filtroModCalidadVida": {
			etiquetasModificar = ['modCalidadVida1', 'modCalidadVida2', 'modCalidadVida3', 'modCalidadVida4', 'modCalidadVida5', 'modCalidadVida6']
			break;
		}
		//
		case "filtroAccesorios": {
			etiquetasModificar = ['accesorios1', 'accesorios2', 'accesorios3', 'accesorios4']
			break;
		}
		//
		case "filtroConsolasModificadas": {
			etiquetasModificar = ['productoMod1', 'productoMod2', 'productoMod3', 'productoMod4', 'productoMod5', 'productoMod6', 'productoMod7', 'productoMod8']
			break;
		}
		//
		case "filtroMemoriasFlash": {
			etiquetasModificar = ['cartuchoFlash1', 'cartuchoFlash2', 'cartuchoFlash3']
			break;
		}
		//
		case "filtroJuegosOriginales": {
			etiquetasModificar = ['juegoOriginal1', 'juegoOriginal2', 'juegoOriginal3', 'juegoOriginal4', 'juegoOriginal5', 'juegoOriginal6', 'juegoOriginal7', 'juegoOriginal8', 'juegoOriginal9']
			break;
		}
		/*
		case "": {
			etiquetasModificar = []
			break;
		}
		*/
	}
}

// La funcion recibe un arreglo con todos los elementos a modificar y un booleano que indica si se añade/elimina una clase
// Por medio de un for of se recorren todos los elementos del array, se busca el elemento que concuerde con el Id en el HTML y se le agrega/elimina la clase "elementoOculto"
function ocultarMostrarElementos(arrayElementosCambiar, checkMarcado) {
	console.log(checkMarcado)
	if (checkMarcado == true) {
		for (let elemento of arrayElementosCambiar) {
			document.getElementById(`${elemento}`).classList.remove('elementoOculto');
		}
	} else {
		for (let elemento of arrayElementosCambiar) {
			document.getElementById(`${elemento}`).classList.add('elementoOculto');
		}
	}
}

inputsCheck.forEach((input) => {
	input.addEventListener('change', () => {
		prepararArray(input.name);
		ocultarMostrarElementos(etiquetasModificar, input.checked);
	});
});
// Crear los event listener para los inputs del formulario
// inputsCheck.forEach((input) => {
// 	// Se le coloca el parametro input para poder identificarlo

// 	// Este event listener busca cuando se presiono y solo una tecla en un input. Ejecuta una funcion que valida el formulario
// 	input.addEventListener('change', validarFormulario);

// 	// Este event listener se activa si el usuario da click fuera del input. Ejecuta una funcion que valida el formulario
// 	input.addEventListener('blur', validarFormulario);
// });

// ____________________________________________________________________________________________