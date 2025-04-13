// Al cargar la página, mostramos las tareas guardadas en localStorage
window.onload = function () {
    cargarTareas();
};

// Función que se ejecuta cuando se hace clic en "Agregar Tarea"
function agregarTarea() {
    // Obtener el valor que el usuario escribió en el input
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value.trim();

    // Validar que no esté vacío
    if (nuevaTareaTexto === "") {
        alert("Por favor, ingrese una tarea.");
        return; // salir si no hay texto
    }

    // Obtener las tareas actuales desde localStorage
    let tareas = obtenerTareas();

    // Agregar la nueva tarea como un objeto
    tareas.push({ texto: nuevaTareaTexto, completada: false });

    // Guardar la nueva lista en localStorage
    guardarTareas(tareas);

    // Actualizar la interfaz para mostrar la nueva tarea
    mostrarTareas();

    // Limpiar el campo de entrada
    document.getElementById("nuevaTarea").value = "";
}

// Muestra todas las tareas en el HTML
function mostrarTareas() {
    // Seleccionamos el <ul> donde están las tareas
    let lista = document.getElementById("listaTareas");
    lista.innerHTML = ""; // Limpiamos la lista

    // Obtenemos la lista actual de tareas desde localStorage
    let tareas = obtenerTareas();

    // Recorremos cada tarea y la mostramos en pantalla
    tareas.forEach((tarea, index) => {
        // Creamos un nuevo <li> para cada tarea
        let nuevaTarea = document.createElement("li");

        // Creamos un <span> para mostrar el texto de la tarea
        let textoTarea = document.createElement("span");
        textoTarea.textContent = tarea.texto;
        textoTarea.classList.add("texto-tarea");

        // Si está completada, le agregamos la clase para tacharla
        if (tarea.completada) {
            textoTarea.classList.add("completada");
        }

        // --- Botón para marcar como completada ---
        let botonCompletar = document.createElement("button");
        botonCompletar.textContent = "✔️";
        botonCompletar.title = "Marcar como completada";

        // Al hacer clic, alterna el estado completada
        botonCompletar.onclick = function () {
            tareas[index].completada = !tareas[index].completada;
            guardarTareas(tareas); // Guardamos los cambios
            mostrarTareas();       // Volvemos a dibujar la lista
        };

        // --- Botón para eliminar tarea ---
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "✖";
        botonEliminar.title = "Eliminar tarea";

        // Al hacer clic, elimina esa tarea del array
        botonEliminar.onclick = function () {
            tareas.splice(index, 1); // Elimina una tarea según el índice
            guardarTareas(tareas);   // Guarda la nueva lista
            mostrarTareas();         // Actualiza la interfaz
        };

        // Agregamos el texto y los botones al <li>
        nuevaTarea.appendChild(textoTarea);
        nuevaTarea.appendChild(botonCompletar);
        nuevaTarea.appendChild(botonEliminar);

        // Agregamos el <li> al <ul>
        lista.appendChild(nuevaTarea);
    });

    // Actualizamos los contadores (total, completadas, pendientes)
    actualizarContadores(tareas);
}

// Función que obtiene las tareas desde localStorage
function obtenerTareas() {
    let tareasGuardadas = localStorage.getItem("misTareas");

    // Si hay tareas guardadas, las convertimos a array con JSON.parse
    // Si no hay, devolvemos un array vacío
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

// Función que guarda un array de tareas en localStorage
function guardarTareas(tareas) {
    // Convertimos el array a texto JSON
    localStorage.setItem("misTareas", JSON.stringify(tareas));
}

// Función que carga y muestra las tareas cuando se abre la página
function cargarTareas() {
    mostrarTareas();
}

// Muestra la cantidad de tareas totales, completadas y pendientes
function actualizarContadores(tareas) {
    let total = tareas.length;
    let completadas = tareas.filter(t => t.completada).length;
    let pendientes = total - completadas;

    // Mostramos los valores en los spans correspondientes
    document.getElementById("total").textContent = `Total: ${total}`;
    document.getElementById("completadas").textContent = `Completadas: ${completadas}`;
    document.getElementById("pendientes").textContent = `Pendientes: ${pendientes}`;
}
