const urlSeries = 'http://localhost:1337/api/series';

// Función para obtener los films filtrados por la categoría "Animation"
async function obtenerSeries(Category) {
    try {
        console.log(Category)
        // Hacemos una solicitud GET a la API
        const response = await fetch(urlSeries);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los films');
        }

        // Parseamos la respuesta a JSON
        const films = await response.json();

        if (Category != null){
            // Filtramos los films para que solo contengan la categoría "Animation"
            const filmsCategory = films.data.filter(film =>
                // Aseguramos que film.Category existe y es igual a "Animation"
                film.Category === Category
            );

            return filmsCategory;
        }

        return films.data
    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}