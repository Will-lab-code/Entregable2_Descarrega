let containerResumen = document.getElementById("resumen-container")
let listaGuardada = JSON.parse(localStorage.getItem("listAct")) || []

if (listaGuardada.length === 0) {
    containerResumen.innerHTML = "<p>No seleccionaste ninguna actividad. </p>";
} else {
    let total = 0;

    listaGuardada.forEach((actividades) => {
        total += actividades.duracion

        let card = document.createElement("div");
        card.innerHTML = `  <h3>${actividades.nombre}</h3>
                            <p> Duración: ${actividades.duracion} </p> `

        containerResumen.appendChild(card)
    });

    let totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong> Total planificado: </strong> ${total} minutos`
    containerResumen.appendChild(totalElement)
}

// Botón para resetear el día
let btnReset = document.getElementById("btn-reset")
btnReset.addEventListener("click",() => {
    localStorage.removeItem("listAct")
    location.reload()
})