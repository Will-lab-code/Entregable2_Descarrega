let containerResumen = document.getElementById("resumen-container")
let listaGuardada = JSON.parse(localStorage.getItem("listAct")) || []

if (listaGuardada.length === 0) {
    containerResumen.innerHTML = `<p>No seleccionaste ninguna actividad. </p>
                                <br><a href="../index.html">Volver a seleccionar </a>`
} else {
    let total = 0;

    listaGuardada.forEach((actividades, index) => {
        total += actividades.duracion

        let card = document.createElement("div");
        card.classList.add("actividad-resumen")
        card.innerHTML = `  <h3>${actividades.nombre}</h3>
                            <p> Duración: ${actividades.duracion} minutos</p>
                            <button class="btn-eliminar" data-index="${index}">Eliminar</button>`

        containerResumen.appendChild(card)
    });

    let totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong> Total planificado: </strong> ${total} minutos`
    containerResumen.appendChild(totalElement)

    asignarEventosEliminar(listaGuardada)
}

function asignarEventosEliminar(lista) {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click",(e) => {
            const index = e.currentTarget.dataset.index
            lista.splice(index, 1)
            localStorage.setItem("listAct", JSON.stringify(lista))
            location.reload()
        })
    })
}

// Botón para resetear el día
let btnReset = document.getElementById("btn-reset")
btnReset.addEventListener("click",() => {
    Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará todas las actividades planificadas.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed){
        localStorage.removeItem("listAct")
    location.reload()
    }
  })  
})