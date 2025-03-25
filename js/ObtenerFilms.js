const url = 'http://localhost:1337/api/films';

// Función para obtener los films filtrados por la categoría "Animation"
async function obtenerFilms(Category, type) {
    try {
        console.log(Category)
        console.log(type)
        // Hacemos una solicitud GET a la API
        const response = await fetch(url);

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
                film.Category === Category && film.type === type
            );
            return filmsCategory;
        } else if (Category == null && type != null){
            // Filtramos los films para que solo contengan la categoría "Animation"
            const filmsCategory = films.data.filter(film =>
                film.type === type
            );
            console.log(filmsCategory)
            return filmsCategory;
        } else {
            return films.data
        }

    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}