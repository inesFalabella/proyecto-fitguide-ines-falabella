// Menu hamburgueasa

import hamburgerMenu from "./menu.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
    hamburgerMenu(".panel-btn",".panel", ".menu a" );
});

//  Dark Mode

const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    btnSwitch.classList.toggle("active");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("darkMode", "true");
    } else{
        localStorage.setItem("darkMode", "false");
    }
})

if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark");
    btnSwitch.classList.add("active");
} else {
    document.body.classList.remove("dark");
    btnSwitch.classList.remove("active");
}

//  Calculo Imc

const calcular = document.getElementById("calcular");

function imc () {
    
    const nombreImc = document.getElementById("nombreImc").value;
    const talla = document.getElementById("talla").value;
    const peso = document.getElementById("peso").value;
    const resultado = document.getElementById("resultado");

    if (nombreImc !== ""  && peso !== "" && talla !== ""){
        const calculoImc = (peso / talla**2).toFixed(1);
        resultado.textContent = calculoImc;
        Swal.fire("Tu IMC es igual a " + calculoImc);
    }
    else{
        resultado.textContent = "Faltan completar datos";
        Swal.fire("No completaste todos los datos");
    }  
}

calcular.addEventListener("click", imc);

// Captura de datos de Formulario IMC

const baseDatos = [];

function capturar(){
	class Usuario {
		constructor(nombreImc, peso, talla) {
			this.nombreImc = nombreImc;
			this.peso = peso;
			this.talla = talla;
		}
	}

	let nombreImc = d.getElementById("nombreImc").value;
    let talla = d.getElementById("talla").value;
    let peso = d.getElementById("peso").value;
    
	let newUsuario = new Usuario(nombreImc, peso, talla);
	console.log(newUsuario);
	agregar();


    function agregar(){
        baseDatos.push(newUsuario);
        console.log(baseDatos);
}
}

calcular.addEventListener("click", capturar);


// Calculo Tasa Metabolica Basal

const calcularTmb = document.getElementById("calcularTmb");

function tmb () {
    
    const sexo = document.getElementById("sexo").value;
    const pesoTmb = document.getElementById("pesoTmb").value;
    const edad = document.getElementById("edad").value;
    const tallaCm = document.getElementById("tallaCm").value;
    const resultadoTmb = document.getElementById("resultadoTmb");
    
    if (sexo.toLowerCase() == "hombre") {
        const tmbH = (66.473 + (13.751 * pesoTmb) + (5.0033 * tallaCm) - (6.55 * edad)).toFixed(1);
        resultadoTmb.textContent = tmbH;
        Swal.fire("Tu Tasa metabolica basal es igual a " + tmbH);
    } 
    else if (sexo.toLowerCase() == "mujer"){
        const tmbM = (665.51 + (9.463 * pesoTmb) + (1.8 * tallaCm) - (4.6756 * edad)).toFixed(1);
        resultadoTmb.textContent = tmbM;
        Swal.fire("Tu Tasa metabolica basal es igual a " + tmbM);
    }
    else {
        resultadoTmb.textContent = "Faltan completar datos";
        Swal.fire("No completaste todos los datos"); 
    }    
}

calcularTmb.addEventListener("click", tmb);

// Calculo Grasa Corporal

const calcularGr = document.getElementById("calcularGr");

function grCorp () {
    
    const sexoGr = document.getElementById("sexoGr").value;
    const pesoGr = document.getElementById("pesoGr").value;
    const cintura = document.getElementById("cintura").value;
    const cadera = document.getElementById("cadera").value;
    const resultadoGr = document.getElementById("resultadoGr");
    
    
    if (sexoGr.toLowerCase() == "hombre") {
        const grH = ((( pesoGr - ((( pesoGr * 0.85 ) + 28) - (cintura * 0.35))) * 100) / pesoGr).toFixed(1);
        resultadoGr.textContent = grH;
        Swal.fire("Tu porcentaje de grasa corporal es igual a " + grH);
    } 
    else if (sexoGr.toLowerCase() == "mujer"){
        const grM = ((( pesoGr - (((pesoGr * 0.86) + 24) - (cintura * 0.14) - (cadera * 0.2))) * 100) / pesoGr).toFixed(1);
        resultadoGr.textContent = grM;
        Swal.fire("Tu porcentaje de grasa corporal " + grM);
    }
    else {
        resultadoGr.textContent = "Faltan completar datos";
        Swal.fire("No completaste todos los datos"); 
    }  
    
}

calcularGr.addEventListener("click", grCorp);


// Formulario de Contacto

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		//formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		    Swal.fire("En breve uno de nuestros profesionales se contactará"); 
        });
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


d.addEventListener("submit", (e) => {
	e.preventDefault();

	const prePayload = new FormData(formulario);
    const payload = new URLSearchParams(prePayload);
	
	console.log([...payload]);

	fetch("http://httpbin.org/post", {
		method: "POST",
		body: payload,
	})

	    .then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err));

})

d.addEventListener("submit", (e) => {
	e.preventDefault();

	
	fetch("https://formsubmit.co/ajax/inefala@gmail.com", {
        
	    method: "POST",
        body: new FormData(e.target),
})
	    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
			console.log(json);
		}) 
		.catch(err => {
			console.log(err);
		})
})

