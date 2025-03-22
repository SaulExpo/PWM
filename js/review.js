const url2 = 'http://localhost:1337/api/reviews?populate=*';
async function getReviews(film){
    try {
        console.log(film)
        // Hacemos una solicitud GET a la API
        const response = await fetch(url2);

        // Verificamos si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de los reviews');
        }

        // Parseamos la respuesta a JSON
        const reviews = await response.json();
        console.log(film.Title)

        // Filtramos los films para que solo contengan la categoría "Animation"
        const filmreviews = reviews.data.filter(review =>
            review.film.Title === film.Title
        );
        return filmreviews;


    } catch (error) {
        console.error('Error al obtener los films:', error);
    }
}

async function pushReview(user, film){

        if(LOGGED === "false"){
            window.location.href = `../HTML Pages/login.html`;
            return
        }

        const description = document.getElementById('Description').value;
        // Crear el objeto que se enviará a Strapi
        const formData = {
            data: {
                Description: description,
                app_user: { connect: [user] }, // Relación con el usuario
                film: { connect: [film] }
            }
        };
        console.log(formData)

        try {
            // Enviar los datos a Strapi usando fetch (puedes usar axios también)
            const response = await fetch('http://localhost:1337/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Procesar la respuesta de Strapi
                location.reload();
            } else {
                alert('Hubo un error al enviar el formulario');
                console.error('Error de respuesta:', result);
            }
        } catch (error) {
            console.error('Error al enviar los datos a Strapi:', error);
        }
}