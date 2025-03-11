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

        // Mostramos los datos en la consola
        console.log(films);

        // Aquí podrías procesar los datos y mostrarlos en tu página, por ejemplo:
        films.data.forEach(film => {
            console.log(`Título: ${film.Title}`);
            console.log(`Descripción: ${film.Description}`);
            console.log(`Imagen: ${film.documentId}`);
        });
        return films.data
    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}