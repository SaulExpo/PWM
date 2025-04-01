// Función para obtener los films filtrados por la categoría "Animation"
async function getUser(email, password) {
    let url = 'http://localhost:1337/api/app-users';
    try {
        // Hacemos una solicitud GET a la API
        const response = await fetch(url);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los usuarios');
        }

        // Parseamos la respuesta a JSON
        const users = await response.json();

        const userselected = users.data.filter(user =>
            user.email === email && user.password === password
        );
        return userselected[0];

    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}