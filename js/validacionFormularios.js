// _____________________________ Seccion Preparaciones Formulario _____________________________
// Esta lista de expresiones en terminos simple, a riesgo de sobresimplificar las cosas, sirve como una lista de filtros para ciertos campos
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,8}$/, // 8 numeros.
	numerosTarjeta: /^\d{16,16}$/, // 16 numeros.
	codigoSeguridad: /^\d{3,3}$/, // 3 numeros.
	juegoReproducir: /^.{1,30}$/, // 1 a 30 letras
}

/* Estos se usaran para validar que el usuario ingreso todos los datos */
let campos = {
	nombre: false, // N3 - R1
	apellido1: false, // N3 - R1
	apellido2: false, // N3 - R1
	fechaNacimiento: false, // N3
	numerosTarjeta: false, // N3
	fechaVencimientoTarjeta: false, // N3
	codigoSeguridad: false, // N3
	correo: false, // N3 - R1
	telefono: false, // N3 - R1
	juegoReproducir: false // R1
}

/* Asi nos evitamos tener que escribir este codigo varias veces */
const formulario = document.getElementById('formulario');

// Esto retorna un arreglo con todos los inputs de los formularios. De esta fomra les podemos colocar event listener de manera facil
const inputs = document.querySelectorAll('#formulario input')

// ____________________________________________________________________________________________


// _____________________________ Funciones Varias _____________________________
// Un simple promt que muestra al usuario que el formulario se ha enviado con exito
function promtFormularioExito() {
	Swal.fire({
		icon: 'success',
		title: 'Datos enviados',
		html:
			'Los datos se han enviado con exito!!! <br>',
		showConfirmButton: true,
		timer: 5000 // con este se puede programar para que la ventana se cierre sola tras cierto tiempo
	})
}

// Un promt que muestra un pequeño texto e inserta en html una etiqueta de video
function promtFormularioBroma() {
	Swal.fire({
		title: 'You have been rickrolled',
		html:
			'<video class="video" id="video1" src="/video/video1_cortado.mp4"></video>',
		showConfirmButton: true,
		timer: 10000 // con este se puede programar para que la ventana se cierre sola tras cierto tiempo
	})
	//seleccionar el elemento de video
	const miVideo = document.getElementById('video1');

	//reproducir el video
	miVideo.play();
}

// ____________________________________________________________________________________________

// _____________________________ Seccion Validación Formulario _____________________________
// Las siguietnes funciones cambian a verdadero ciertos elementos, esto porque usamos la misma lista de campos para ambos formularios por facilidad. Esto se puede trabajar de muchas formas, otra forma seria creando una lista de campos para cada formulario
function revisarComprobacionesFormulariosNoticia3() {
	campos.telefono = true;
	campos.juegoReproducir = true;
	campos.fechaNacimiento = true;
	campos.fechaVencimientoTarjeta = true;
}

function revisarComprobacionesFormulariosReproducciones() {
	campos.fechaNacimiento = true;
	campos.numerosTarjeta = true;
	campos.fechaVencimientoTarjeta = true;
	campos.codigoSeguridad = true;
	campos.numerosTarjeta = true;
}

function pasarCamposNegativo() {
	campos.nombre = false;
	campos.apellido1 = false;
	campos.apellido2 = false;
	campos.fechaNacimiento = false;
	campos.numerosTarjeta = false;
	campos.fechaVencimientoTarjeta = false;
	campos.codigoSeguridad = false;
	campos.correo = false;
	campos.telefono = false;
	campos.juegoReproducir = false;
}

// Esta funcion se encarga de revisar que los datos que el usuario ingrese sean validos
// Primero se busca el nombre del input ya que se aplican diferentes filtros dependiendo del input
const validarFormulario = (e) => {
	// "console.log(e.target.name)" esto busca el name del elemento y lo retorna. Supongo que lo mismo se podria aplicar para la clase/id pero no lo he intentado
	switch (e.target.name) {
		case "nombre": {
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		}

		case "apellido1": {
			validarCampo(expresiones.nombre, e.target, 'apellido1');
			break;
		}

		case "apellido2": {
			validarCampo(expresiones.nombre, e.target, 'apellido2');
			break;
		}

		case "correo": {
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		}

		case "numerosTarjeta": {
			validarCampo(expresiones.numerosTarjeta, e.target, 'numerosTarjeta');
			break;
		}

		case "codigoSeguridad": {
			validarCampo(expresiones.codigoSeguridad, e.target, 'codigoSeguridad');
			break;
		}

		case "telefono": {
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
		}

		case "juegoReproducir": {
			validarCampo(expresiones.juegoReproducir, e.target, 'juegoReproducir');
			break;
		}
	}

}

// Esta funcion se encarga de validar los datos de un input
/* Esta recibe 3 parametros:
	1: expresion: se coloca al inicio de if, marca que "filtros" vamos a usar
	2: input: que input vamos a comprobar
	3: campo: es para saber que grupo de input estamos trabajando
*/
const validarCampo = (expresion, input, campo) => {
	// Este if retorna verdadero si lo que se pone entre los parentesis cumple con las condiciones indicadas por el objeto expresiones, explicacion mas detallada de como funciona arriba
	// quede en el minuto 33:32 del video
	if (expresion.test(input.value)) {
		// Le colocamos la clase correcto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');

		// Le quitamos la clase incorrecto
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');

		// Quitamos el icono de error
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');

		// Colocamos el icono check
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');

		// Quitamos el parrafo de error
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')

		// Cambiar flag que indica que el campo es correcto
		campos[campo] = true;
	} else {
		// Le colocamos la clase incorrecto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');

		// Le quitamos la clase correcto
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');

		// Quitamos el icono de check
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');

		// Colocamos el icono error
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');

		// Mostramos el parrafo de error
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')

		// Cambiar flag que indica que el campo es incorrecto
		campos[campo] = false;
	}
}

// Esta toma el arrray que tiene todos los inputs de la pagina y les coloca un event listener
// En este caso revisa para cuando una tecla es levantada y cuando el usuario da click afuera del formulario 
inputs.forEach((input) => {
	// Se le coloca el parametro input para poder identificarlo

	// Este event listener busca cuando se presiono y solo una tecla en un input. Ejecuta una funcion que valida el formulario
	input.addEventListener('keyup', validarFormulario);

	// Este event listener se activa si el usuario da click fuera del input. Ejecuta una funcion que valida el formulario
	input.addEventListener('blur', validarFormulario);
});

// Este bloque de codigo revisa si se presiona el boton enviar y previene enviar el archivo con algun dato en blanco o incorrecto
formulario.addEventListener('submit', (e) => {
	// Esto bloquea que el usuario envie los datos en blanco
	e.preventDefault();

	const terminos = document.getElementById('terminos')

	// La siguiente comprobacion revisa que todos los formularios y el check de terminos y condiciones esten correctos
	if (campos.nombre && campos.apellido1 && campos.apellido2 && campos.fechaNacimiento && campos.numerosTarjeta && campos.fechaVencimientoTarjeta && campos.codigoSeguridad && campos.correo && campos.telefono && campos.juegoReproducir && terminos.checked) {
		// Borra el contenido de los input
		formulario.reset();

		// Muestra el mensaje de exito
		promtFormularioExito();

		// Quitar iconos
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto')
		});

		// Quitar mensaje error
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

		// volver a colocar las validaciones en negativo en caso que se desee volver a enviar otro formulario
		pasarCamposNegativo();


	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	};

});
// ____________________________________________________________________________________________

// `