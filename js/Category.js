obtenerFilms().then(films => {
    LoadFilm_categories(films);
    prepararRotacion()
});