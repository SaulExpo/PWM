function prepararRotacion() {
// Función que maneja la rotación de las imágenes
    console.log(document.getElementById("triangular-button-right"))
    let buttons = document.querySelectorAll('.t-button-right');
    buttons.forEach((button, index) => {
        console.log(button);
        button.addEventListener('click', function () {
            // Obtener el contenedor de las imágenes
            const container = button.parentElement.firstElementChild;

            // Mover la primera imagen al final del contenedor
            const firstImage = container.firstElementChild;
            container.appendChild(firstImage);
        });
    });
}

