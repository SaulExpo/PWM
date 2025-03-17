const url = 'http://localhost:1337/api/films';

// Función para obtener los films
async function obtenerFilms() {
    try {
        // Hacemos una solicitud GET a la API
        const response = await fetch(url);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los films');
        }

        // Parseamos la respuesta a JSON
        const films = await response.json();

        return films.data
    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}