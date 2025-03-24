const urlFavourites = 'http://localhost:1337/api/favourite-films?populate=*';

async function getFavourites() {
    try {
        // Hacemos una solicitud GET a la API
        const response = await fetch(urlFavourites);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los films');
        }

        // Parseamos la respuesta a JSON
        const films = await response.json();

        // Filtramos los films para que solo contengan la categoría "Animation"
        const favouriteFilms = films.data.filter(film =>
            // Aseguramos que film.Category existe y es igual a "Animation"
            film.app_user.Name === NAME
        );
        return favouriteFilms[0];


    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}

async function addFavourites(user, film, serie) {
    try {
        // Obtener la lista de favoritos actual del usuario
        const favourites = await getFavourites(user);

        if (!favourites) {
            console.error("No se encontró la lista de favoritos del usuario.");
            return;
        }

        const favouriteId = favourites.documentId; // ID del registro en la tabla intermedia
        const existingFilms = favourites.films.map(f => ({ id: f.id })); // Películas ya en favoritos

        // Verificar si la película ya está en favoritos
        let formData ={}
        if (serie == null){
            console.log("peli")
            if (existingFilms.some(f => f.id === film.id)) {
                console.log("La película ya está en favoritos.");
                return;
            }

            // Agregar la nueva película a la lista
            const updatedFilms = [...existingFilms, { id: film.id }];

            console.log(updatedFilms);

            formData = {
                data: {
                    films: { connect: updatedFilms }
                }
            };
        } else {
            console.log("serie")
            if (existingFilms.some(f => f.id === serie.id)) {
                console.log("La película ya está en favoritos.");
                return;
            }

            // Agregar la nueva película a la lista
            const updatedFilms = [...existingFilms, { id: serie.id }];

            console.log(updatedFilms);

            formData = {
                data: {
                    series: { connect: updatedFilms }
                }
            };
        }


        // Enviar la actualización a Strapi
        const response = await fetch(`http://localhost:1337/api/favourite-films/${favouriteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Película añadida a favoritos.");
            location.reload();
        } else {
            alert('Hubo un error al enviar el formulario');
            console.error('Error de respuesta:', result);
        }
    } catch (error) {
        console.error('Error al enviar los datos a Strapi:', error);
    }
}

async function removeFavourite(user, film, serie) {
    try {
        // Obtener la lista de favoritos actual del usuario
        const favourites = await getFavourites(user);

        if (!favourites) {
            console.error("No se encontró la lista de favoritos del usuario.");
            return;
        }

        const favouriteId = favourites.documentId; // ID del registro en la tabla intermedia
        let formData = {}
        if(serie == null){
            const existingFilms = favourites.films.map(f => ({ id: f.id })); // Películas ya en favoritos

            // Verificar si la película está en favoritos
            if (!existingFilms.some(f => f.id === film.id)) {
                console.log("La película no está en favoritos.");
                return;
            }

            // Nueva lista de películas sin la que queremos eliminar
            const updatedFilms = existingFilms.filter(f => f.id !== film.id);

            formData = {
                data: {
                    films: { set: updatedFilms } // Actualizamos la lista eliminando la película
                }
            };
        } else {
            const existingFilms = favourites.films.map(f => ({ id: f.id })); // Películas ya en favoritos

            // Verificar si la película está en favoritos
            if (!existingFilms.some(f => f.id === serie.id)) {
                console.log("La película no está en favoritos.");
                return;
            }

            // Nueva lista de películas sin la que queremos eliminar
            const updatedFilms = existingFilms.filter(f => f.id !== serie.id);

            formData = {
                data: {
                    series: { set: updatedFilms } // Actualizamos la lista eliminando la película
                }
            };
        }


        // Enviar la actualización a Strapi
        const response = await fetch(`http://localhost:1337/api/favourite-films/${favouriteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Película eliminada de favoritos.");
            location.reload();
        } else {
            alert('Hubo un error al enviar la solicitud');
            console.error('Error de respuesta:', result);
        }
    } catch (error) {
        console.error('Error al enviar los datos a Strapi:', error);
    }
}

