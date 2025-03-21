const url = 'http://localhost:1337/api/app-users';

// Función para obtener los films filtrados por la categoría "Animation"
async function login(email, password) {
    try {
        // Hacemos una solicitud GET a la API
        const response = await fetch(url);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los usuarios');
        }

        // Parseamos la respuesta a JSON
        const users = await response.json();

        // Filtramos los films para que solo contengan la categoría "Animation"
        const userselected = users.data.filter(user =>
            // Aseguramos que film.Category existe y es igual a "Animation"
            user.email === email && user.password === password
        );

        return userselected[0];

    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('form-style').addEventListener('submit', async function(e) {
            e.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log(email, password);

        login(email, password).then(user => {
            console.log(user)
            if (user.Name != null){
                localStorage.setItem('LOGGED', 'true');
                window.location.href = `../HTML Pages/profile.html`;
            } else{
                console.log("USUARIO NO VALIDO")
            }
        })

    });
});

