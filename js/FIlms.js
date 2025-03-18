obtenerFilms().then(films => {
    const n_films = films.length;
    let article = `<article class ="c-right-arrow"></article>`;
    for (let i = 0; i < n_films%4; i++) {
        document.getElementsByTagName("main")[0].innerHTML += article
    }
    Promise.all([
        loadTemplate_class("../templates/category-right-arrow.html", 'c-right-arrow'),
        loadTemplate_class("../templates/image-and-text-under.html", 'image-title'),
        loadTemplate_class("../templates/triangular-button-right.html", 't-button-right')
    ]).then(() => {
        const pElements = document.querySelectorAll('.image-title p'); // Selecciona todos los <p> dentro de #X
        const imgElements = document.querySelectorAll('.image-title img'); // Selecciona todos los <p> dentro de #X
        films.forEach((film, index) => {
            console.log(imgElements[index]);
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
        imgElements.forEach(img => {
            img.addEventListener('click', function(event) {
                let film_name = img.parentNode.parentNode.lastElementChild.textContent;
                event.preventDefault();

                // Obtener el src de la imagen
                const imgname = encodeURIComponent(film_name); // Codificar URL para evitar problemas
                // Redirigir a la página de detalles con el src como parámetro
                window.location.href = `../HTML Pages/film-info.html?name=${imgname}`;
            });
        });
    })
});