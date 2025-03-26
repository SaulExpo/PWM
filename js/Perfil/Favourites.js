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
        if (favouriteFilms[0] == null){
            return null;
        }
        return favouriteFilms[0];


    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}

async function addFavourites(user, film) {
    try {
        // Obtener la lista de favoritos actual del usuario
        const favourites = await getFavourites(user);
        if (favourites == null){
            createFavourites(user);
        }

        const favouriteId = favourites.documentId; // ID del registro en la tabla intermedia


        // Verificar si la película ya está en favoritos
        let formData ={}
        let existingFilms = favourites.films.map(f => ({ id: f.id })); // Películas ya en favoritos
        if (existingFilms.some(f => f.id === film.id)) {
            console.log("La película ya está en favoritos.");
            return;
        }

        // Agregar la nueva película a la lista
        const updatedFilms = [...existingFilms, { id: film.id }];


        formData = {
            data: {
                films: { connect: updatedFilms }
            }
        };



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

async function removeFavourite(user, film) {
    try {
        // Obtener la lista de favoritos actual del usuario
        const favourites = await getFavourites(user);

        if (!favourites) {
            console.error("No se encontró la lista de favoritos del usuario.");
            return;
        }

        const favouriteId = favourites.documentId; // ID del registro en la tabla intermedia
        let formData = {}

        const existingFilms = favourites.films.map(f => ({ id: f.id })); // Películas ya en favoritos
        console.log(existingFilms);
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
async function createFavourites(user) {

    let formData = {
        data: {
            app_user: {
                connect: { id: user.id } // Solo pasamos el ID
            },
            films: [],  // Array vacío válido
        }
    };

    console.log("Enviando a Strapi:", JSON.stringify(formData, null, 2)); // Debug para revisar antes de enviar

    try {
        const response = await fetch('http://localhost:1337/api/favourite-films', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Elemento creado con éxito:", result);
            location.reload();  // Recargar la página si la solicitud es exitosa
        } else {
            alert("Hubo un error al enviar el formulario");
            console.error("Error de respuesta:", result);
        }
    } catch (error) {
        console.error("Error al enviar los datos a Strapi:", error);
    }
}