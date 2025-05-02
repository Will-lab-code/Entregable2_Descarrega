const productos= [
    {
        id: 1, 
        nombre: "televisor", 
        precio: 5000
    },
    {
        id: 2, 
        nombre: "lavarropas", 
        precio: 8000
    },
    {
        id: 3, 
        nombre: "microondas", 
        precio: 2000
    },
    {
        id: 4, 
        nombre: "secadora", 
        precio: 4000
    },
    {
        id: 5, 
        nombre: "cocina", 
        precio: 13000
    },
]
let cartProducts = []
let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>$${producto.precio}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`
        productsContainer.appendChild(card)
    })
    addToCartButton()
}
renderProductos(productos)


function addToCartButton () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selecterProducts = productos.find(producto => producto.id == productId)
            cartProducts.push(selecterProducts)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}


