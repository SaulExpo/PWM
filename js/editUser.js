async function actualizarElemento(id) {
    try {
        // Obtener datos actuales
        let respuesta = await fetch(`http://localhost:1337/api/app-users/${id}`);

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(name, surname, email, password);

        // Crear el objeto que se enviará a Strapi
        const formData = {
            data: {
                Name: name,
                Surname: surname,
                email: email,
                password: password
            }
        };

        // Enviar actualización
        let actualizar = await fetch(`http://localhost:1337/api/app-users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        let resultado = await actualizar.json();
        console.log("Actualización exitosa:", resultado);
        getUser(email, password).then(user => {
            console.log(user);
            login(user)
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    getUser(EMAIL, PASSWORD).then(user =>{
        document.getElementById('form-style').addEventListener('submit', async function(e){
           e.preventDefault();
           actualizarElemento(user.documentId);
        });
    })

});