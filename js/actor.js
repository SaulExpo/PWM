async function getActor(filmProvided) {
    let url = 'http://localhost:1337/api/films?populate=*&pagination[page]=1&pagination[pageSize]=100';
    try {
        // Hacemos una solicitud GET a la API
        const response = await fetch(url);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los usuarios');
        }

        // Parseamos la respuesta a JSON
        const films = await response.json();
        // Filtramos los films para que solo contengan la categoría "Animation"
        const filmselected = films.data.filter(film =>
            // Aseguramos que film.Category existe y es igual a "Animation"
            film.Title === filmProvided.Title
        );
        return filmselected[0].actors;

    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}

async function getActors() {
    let url = 'http://localhost:1337/api/actors?populate=*&pagination[page]=1&pagination[pageSize]=100';
    try {
        // Hacemos una solicitud GET a la API
        const response = await fetch(url);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los usuarios');
        }

        // Parseamos la respuesta a JSON
        const actors = await response.json();

        return actors.data;

    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}