obtenerFilms().then(films => {
    console.log(films)
    const pElements = document.querySelectorAll('.image-title p'); // Selecciona todos los <p> dentro de #X
    const imgElements = document.querySelectorAll('.image-title img'); // Selecciona todos los <p> dentro de #X
    films.forEach((film, index) => {
        // Verificamos si hay un <p> para reemplazar
        if (pElements[index]) {
            // Cambiamos el contenido de cada <p> por la descripción de la película
            pElements[index].textContent = film.Title;
        }
        if (imgElements[index]) {
            // Cambiamos el contenido de cada <p> por la descripción de la película
            imgElements[index].src = film.CoverUrl;
        }
    });
});