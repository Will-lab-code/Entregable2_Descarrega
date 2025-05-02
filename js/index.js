//Crear la lista
const actividades = [
    {id: 1, nombre: "Estudiar JS", duracion: 60},
    {id: 2, nombre: "Leer 10 páginas de un libro", duracion: 30},
    {id: 3, nombre: "Salir a caminar", duracion: 45},
    {id: 4, nombre: "Practicar guitarra", duracion: 40},
    {id: 5, nombre: "Organizar el día", duracion: 20},  
]


// Referencia al contenedor en el HTML
let listAct = JSON.parse(localStorage.getItem("listAct")) || [];
let actividadesContainter = document.getElementById("actividades-container");


function renderActividades(actividadesArray){
    actividadesArray.forEach(actividad => {
        const card = document.createElement("div")
        card.innerHTML =    `<h3>${actividad.nombre}</h3>
                            <p> Duración: ${actividad.duracion} minutos </p>
                            <button class="actividadAgregar" id="${actividad.id}"> Agregar a mi día </button>`
    
        actividadesContainter.appendChild(card)
    })
    addToListButton()
}
renderActividades(actividades)

function yaEstaAgregada(id) {
    return listAct.some(actividad => actividad.id == id)
}

function addToListButton () {
    addButton = document.querySelectorAll(".actividadAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const actId = e.currentTarget.id

            if(!yaEstaAgregada(actId)){
                const selecterAct = actividades.find(actividad => actividad.id == actId)
                listAct.push(selecterAct)
                localStorage.setItem("listAct", JSON.stringify(listAct))
                mostrarMensaje("Actividad agregada con éxito ✅", "exito")
            } else {
                mostrarMensaje("Esta actividad ya fue agregada ⚠️", "error")
            }
            
        }
        
    })
}

function mostrarMensaje(texto, tipo = "exito") {
    let mensaje = document.getElementById("mensaje")
        mensaje.textContent = texto
        mensaje.className = `mensaje ${mensaje}`

    setTimeout(() => {
        mensaje.textContent = ""
        mensaje.className = "mensaje"
        mensaje.style.display = "none"
    },3000)
    mensaje.style.display = "block"
}
