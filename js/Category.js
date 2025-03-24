document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('name');
    if (categoryType == "pelis") {
        obtenerFilms().then(films => {
            LoadFilm_categories(films, categoryType);
            prepararRotacion()
        });
    } else if (categoryType == "series") {
        obtenerSeries().then(series => {
            LoadFilm_categories(series, categoryType);
            prepararRotacion()
        })
    }

});