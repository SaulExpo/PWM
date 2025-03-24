const urlParams = new URLSearchParams(window.location.search);
const cat_name = urlParams.get('category');
obtenerFilms(cat_name).then(films => {
    obtenerSeries().then(series =>{
        const n_films = films.length+series.length;
        let general = films.concat(series)
        let section = `<section class="image-title"></section>`;
        for (let i = 0; i < n_films; i++) {
            document.getElementById("category").innerHTML += section
        }
        Promise.all([
            loadTemplate_class("../templates/image-and-text-under.html", 'image-title'),
        ]).then(() => {
            loadFilms(general);
            prepararRotacion()
        })
    });
});