//Carga de datos desde JSON
let actividades = []

async function cargarActividades() {
    try {
        const respuesta = await fetch("./bd/actividades.json")
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON")
        }

        actividades = await respuesta.json()
        crearFormularioIngresoManual()
        renderActividades(actividades)
        
    } catch (error) {
        mostrarMensaje("Error al cargar actividades ⚠️", "error")
        console.error(error)
    }
}

// Referencia al contenedor en el HTML
let listAct = JSON.parse(localStorage.getItem("listAct")) || [];
let actividadesContainter = document.getElementById("actividades-container");

//Que el usuario cree sus propia tareas
function crearFormularioIngresoManual(){
    const seccionFormulario = document.createElement("section")
    seccionFormulario.id = "formulario-nueva-actividad"
    seccionFormulario.innerHTML =   `<h2>Agregar nueva actividad</h2>
                                    <input type="text" id="input-nombre" placeholder="Nombre de la actividad" value="Leer un libro"required>
                                    <input type="number" id="input-duracion" placeholder="Duración (minutos)" value="30" required min="1">
                                    <button id="btn-agregar-actividad" class="btn-nueva-actividad"> Agregar actividad</button>`
    document.body.insertBefore(seccionFormulario, document.getElementById("actividades-container"))

    //Asignar evento al botón
    const btnAgregar = document.getElementById("btn-agregar-actividad")

    btnAgregar.addEventListener("click", () => {
        const nombre = document.getElementById("input-nombre").value.trim()
        const duracion = parseInt(document.getElementById("input-duracion").value)

        if (!nombre || isNaN(duracion) || duracion <= 0) {
            Swal.fire({
                icon: "error",
                title: "Error en la carga",
                text: "Por favor completá todos los campos correctamente ⚠️",
                })
            return
        }
    
        const nuevaActividad = {
            id: actividades.length +1,
            nombre,
            duracion
        }
        
        actividades.push(nuevaActividad)

        //Crear una card visual

        const card = document.createElement("div")
        card.classList.add("actividad"),
        card.innerHTML =    `<h3>${nuevaActividad.nombre}</h3>
                            <p>Duración: ${nuevaActividad.duracion} minutos </p>
                            <button class="actividadAgregar" id="${nuevaActividad.id}">Agregar a mi día </button>`

        actividadesContainter.appendChild(card)

        addToListButton()

        // Limpiar

        document.getElementById("input-nombre").value = ""
        document.getElementById("input-duracion").value = ""

        Swal.fire({
            icon: "success",
            title: "Nueva actividad agregada",
            text: "¡Actividad agregada con éxito!",
            })
    })
}

function renderActividades(actividadesArray){
    actividadesArray.forEach(actividad => {
        const card = document.createElement("div")
        card.classList.add("actividad")
        card.innerHTML =    `<h3>${actividad.nombre}</h3>
                            <p> Duración: ${actividad.duracion} minutos </p>
                            <button class="actividadAgregar" id="${actividad.id}"> Agregar a mi día </button>`
    
        actividadesContainter.appendChild(card)
    })
    addToListButton()
}

cargarActividades()

function yaEstaAgregada(id) {
    return listAct.some(actividad => actividad.id == id)
}

function addToListButton () {
    addButton = document.querySelectorAll(".actividadAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const actId = e.currentTarget.id

            if(!yaEstaAgregada(actId)){
                const selectedActivity = actividades.find(actividad => actividad.id == actId)
                listAct.push(selectedActivity)
                localStorage.setItem("listAct", JSON.stringify(listAct))
                Swal.fire({
                    icon: "success",
                    title: "Actividad agregada a tu día",
                    text: "¡Se agregó correctamente a tu día!",
                    })
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Esta actividad ya estaba agregada en tu día",
                    })
            }
            
        }
        
    })
}

function mostrarMensaje(texto, tipo = "exito") {
    let mensaje = document.getElementById("mensaje")
        mensaje.textContent = texto
        mensaje.className = `mensaje ${tipo}`

    setTimeout(() => {
        mensaje.textContent = ""
        mensaje.className = "mensaje"
        mensaje.style.display = "none"
    },3000)
    mensaje.style.display = "block"
}
