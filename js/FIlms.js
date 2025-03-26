const urlParams = new URLSearchParams(window.location.search);
const cat_name = urlParams.get('category');
const type = urlParams.get('type');
obtenerFilms(cat_name, type).then(films => {
    const n_films = films.length;
    let section = `<section class="image-title"></section>`;
    for (let i = 0; i < n_films; i++) {
        document.getElementById("category").innerHTML += section
    }
    Promise.all([
        loadTemplate_class("../templates/image-and-text-under.html", 'image-title'),
    ]).then(() => {
        loadFilms(films);
        prepararRotacion()
    })
});