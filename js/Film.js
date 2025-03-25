const urlParams = new URLSearchParams(window.location.search);
const imageName = urlParams.get('name');
const category = urlParams.get('category');

obtenerFilms().then(films => {
    obtenerSeries().then(series => {
        let selected;
        films.forEach((film, index) => {
            if (film.Title === imageName) {
                selected = film;
            }
        });
        series.forEach((serie, index) => {
            if (serie.Title === imageName) {
                selected = serie;
            }
        });
        Promise.all([
            loadTemplate("../templates/film.html", 'film'),
            loadTemplate_class("../templates/category-right-arrow.html", 'c-right-arrow'),
            loadTemplate_class("../templates/triangular-button-right.html", 't-button-right'),
            loadTemplate_class("../templates/personal-review-read.html", 'read'),
            loadTemplate_class("../templates/personal-review-write.html", 'write'),
            loadTemplate_class("../templates/image-and-text-under.html", 'image-title')
        ]).then(() => {
            document.querySelector('#film_container div img').setAttribute('src', selected.CoverUrl);
            document.getElementById('film_container').lastElementChild.innerHTML = selected.Description;
            console.log(document.getElementById('film_title').children[0]);
            document.getElementById('film_title').children[0].innerHTML = selected.Title;
            for (let i = 0; i < selected.Valoration; i++) {
                let starImg = document.createElement('img');
                starImg.setAttribute('src', "../img/star.png");
                document.getElementById('film_title').appendChild(starImg);
            }
            let articleHTML = "";
            getReviews(selected).then(reviews => {
                reviews.forEach(review => {
                    articleHTML += `
                    <article>
                        <section class="personal-review">
                            <div>
                                <img src=${review.app_user.ProfilePicture} class="circle-picture"/>
                                <p>${review.app_user.Name} ${review.app_user.Surname}</p>
                            </div>
                            
                            <p>${review.Description}</p>
                        </section>
                    </article>
                `;
                })
                console.log(articleHTML);
                document.getElementById("review-container").innerHTML = articleHTML;
            })
            document.getElementById('oval-button').addEventListener('click', async function(e) {
                e.preventDefault();  // Evitar que el formulario se envíe de forma tradicional
                getUser(EMAIL, PASSWORD).then(user => {
                    pushReview(user, selected);
                })

            });
            document.getElementById("Favoritos").addEventListener('click', function(){
                if (document.getElementById("Añadido").textContent == "No añadido"){
                    getUser(EMAIL, PASSWORD).then(user => {
                        if(category == "series"){
                            addFavourites(user, null, selected)
                        }else{
                            addFavourites(user, selected)
                        }

                    })
                }
                else{
                    getUser(EMAIL, PASSWORD).then(user => {
                        if(category == "series"){
                            removeFavourite(user, null, selected)
                        }else{
                            removeFavourite(user, selected)
                        }
                    })
                }
            })
            getFavourites().then(favourites => {
                if(favourites != null) {
                    let añadido = 0
                    let general = favourites.films.concat(favourites.series)
                    general.forEach((film, index) => {
                        if (film.Title === selected.Title) {
                            document.getElementById('Añadido').textContent = "AÑADIDO"
                            añadido = 1
                        }
                    })
                    if (añadido == 0) {
                        document.getElementById('Añadido').textContent = "No añadido"
                    }
                }
            })
            prepararRotacion()

        });
    })
});
