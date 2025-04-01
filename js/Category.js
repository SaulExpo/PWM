document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('name');
    obtenerFilms(null, categoryType).then(films => {
        LoadFilm_categories(films, "Animation", categoryType);
        prepararRotacion()
    });


});