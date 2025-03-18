obtenerFilms().then(films => {
    const n_films = films.length;
    let article = `<article class ="category"></article>`;
    for (let i = 0; i < n_films%4; i++) {
        document.getElementsByTagName("main")[0].innerHTML += article
    }
    Promise.all([
        loadTemplate_class("../templates/category.html", 'category'),
        loadTemplate_class("../templates/image-and-text-under.html", 'image-title'),
    ]).then(() => {
        loadFilms(films);
        prepararRotacion()
    })
});