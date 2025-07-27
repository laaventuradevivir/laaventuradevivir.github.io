let edad = 1;
let ingenio = 0;
let social = 0;
let creatividad = 0;
let ingresos = 0;
let ahorros = 0;
let profesion = "Desempleada/o";

const comentario = document.getElementById("comentario");
const edadElemento = document.getElementById("edad");
const profesionElemento = document.getElementById("profesion");
const ingresosElemento = document.getElementById("ingresos");
const ahorrosElemento = document.getElementById("ahorros");

const habilidades = {
  ingenio: 0,
  social: 0,
  creatividad: 0
};

const trabajos = {
  ingenio: [
    { nombre: "Electricista", requisito: 10, sueldo: 2400 },
    { nombre: "Programador", requisito: 15, sueldo: 6000 },
    { nombre: "Estadista", requisito: 25, sueldo: 15000 }
  ],
  social: [
    { nombre: "Vendedor", requisito: 10, sueldo: 2400 },
    { nombre: "Abogado", requisito: 15, sueldo: 6000 },
    { nombre: "Legislador", requisito: 25, sueldo: 15000 }
  ],
  creatividad: [
    { nombre: "Artista freelance", requisito: 10, sueldo: 1000 },
    { nombre: "Publicista", requisito: 15, sueldo: 6000 },
    { nombre: "Icono cultural", requisito: 25, sueldo: 20000 }
  ]
};

let comentariosPorEdad = {
  20: "Te enfrentás por primera vez a la adultez, con más dudas que certezas.",
  30: "Empezás a preguntarte qué querías hacer con tu vida.",
  40: "Te das cuenta de que el éxito era una ilusión vendida en cuotas.",
  50: "Tenés más anécdotas que energía. Pero todavía resistís.",
  60: "¿Es ahora cuando vivís para vos?",
  70: "Ya viste algunas cosas...",
  80: "Los jovenes te escuchan. Algunos. Tal vez.",
  90: "Estás en la última curva del camino.",
  100: "¿Sos inmortal o simplemente muy obstinadx?"
};

function elegirOpcion(tipo) {
  edad++;
  habilidades[tipo]++;

  document.getElementById("edad").textContent = "Edad: " + edad;
  document.getElementById("ingenio").textContent = "Ingenio: " + habilidades.ingenio;
  document.getElementById("social").textContent = "Social: " + habilidades.social;
  document.getElementById("creatividad").textContent = "Creatividad: " + habilidades.creatividad;

  actualizarOpciones();
  actualizarComentario();
  verificarTrabajoDisponible();
}

function actualizarOpciones() {
  const oIng = document.getElementById("opcion-ingenio");
  const oSoc = document.getElementById("opcion-social");
  const oCre = document.getElementById("opcion-creatividad");

  if (edad >= 3) oCre.textContent = "Jugar con plastilina";
  if (edad >= 5) oCre.textContent = "Dibujar";
  if (edad >= 10) {
    oSoc.textContent = "Hacer amigos";
    oIng.textContent = "Jugar videojuegos";
  }
}

function actualizarComentario() {
  if (edad >= 20 && comentariosPorEdad[edad]) {
    comentario.textContent = comentariosPorEdad[edad];
    comentario.tagName = "h4";
  } else if (edad === 20) {
    comentario.textContent = comentariosPorEdad[edad];
  }
}

function verificarTrabajoDisponible() {
  if (edad === 18) {
    document.getElementById("zona-trabajo").style.display = "block";
  }
}

function mostrarOpcionesTrabajo() {
  const contenedor = document.getElementById("opciones-trabajo");
  contenedor.innerHTML = ""; // Limpiar opciones anteriores
  contenedor.style.display = "block";

  let opciones = [];

  for (let tipo in trabajos) {
    trabajos[tipo].forEach(trabajo => {
      if (habilidades[tipo] >= trabajo.requisito) {
        opciones.push({
          ...trabajo,
          tipo
        });
      }
    });
  }

  if (opciones.length === 0) {
    contenedor.innerHTML = "<p>No calificás para ningún trabajo todavía.</p>";
    return;
  }

  opciones.forEach(trabajo => {
    const btn = document.createElement("button");
    btn.textContent = `${trabajo.nombre} (${trabajo.sueldo} $)`;
    btn.onclick = () => seleccionarTrabajo(trabajo);
    contenedor.appendChild(btn);
  });
}

function seleccionarTrabajo(trabajo) {
  profesion = trabajo.nombre;
  ingresos = trabajo.sueldo;
  profesionElemento.textContent = "Profesión: " + profesion;

  document.getElementById("zona-trabajar").style.display = "block";
}

function irATrabajar() {
  ahorros += ingresos;
  ahorrosElemento.textContent = "Ahorros: " + ahorros + " $";
  edad++;
  edadElemento.textContent = "Edad: " + edad;
}
