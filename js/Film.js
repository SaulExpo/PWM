const urlParams = new URLSearchParams(window.location.search);
const imageName = urlParams.get('name');
const category = urlParams.get('category');

obtenerFilms().then(films => {
    let selected;
    films.forEach((film, index) => {
        if (film.Title === imageName) {
            selected = film;
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
            if(LOGGED === "false"){
                window.location.href = `../HTML Pages/login.html`;
                return
            }
            if (document.getElementById("Añadido").textContent == "No añadido"){
                getUser(EMAIL, PASSWORD).then(user => {
                        addFavourites(user, selected)
                })
            }
            else{
                getUser(EMAIL, PASSWORD).then(user => {
                        removeFavourite(user, selected)
                })
            }
        })
        getFavourites().then(favourites => {
            if(favourites != null) {
                let añadido = 0
                favourites.films.forEach((film, index) => {
                    if (film.Title === selected.Title) {
                        document.getElementById('Añadido').textContent = "AÑADIDO"
                        document.getElementById('Favoritos').value = "Quitar de Favoritos"
                        añadido = 1
                    }
                })
                if (añadido == 0) {
                    document.getElementById('Añadido').textContent = "No añadido"
                    document.getElementById('Favoritos').value = "Añadir a Favoritos"
                }
            }
        })
        getActor(selected).then(actors => {
            if(actors.length > 0) {
                let imagesHTML = "";
                for (let j = 0; j < actors.length; j++) {
                    imagesHTML += `<section class="image-title actor"></section>`; // Cambia el path de las imágenes según tu necesidad
                }

                // Agregar la categoría y las imágenes a la sección HTML
                let sectionsHTML = `
                <a class="category-button"><h1 class="image-and-text-h1">Actores</h1></a>
                <article class="c-right-arrow">
                    <div class="images">
                        ${imagesHTML}
                    </div>
                </article>`;
                document.getElementById("Actores").innerHTML = sectionsHTML;
                console.log(actors);
                let i = 0
                Promise.all([,
                    loadTemplate_class("../templates/actor.html", 'actor'),
                    loadTemplate_class("../templates/triangular-button-right.html", 't-button-right'),
                ]).then(() => {
                    const pElements = document.querySelectorAll('.image-title p'); // Selecciona todos los <p> dentro de #X
                    const imgElements = document.querySelectorAll('.image-title img'); // Selecciona todos los <p> dentro de #X
                    console.log(imgElements);
                    actors.forEach((actor) => {
                        const img = new Image();  // Crea un nuevo objeto Image
                        img.src = actor.pictureUrl;  // Asigna la URL de la imagen al objeto Image

                        img.onload = () => {  // Solo cuando la imagen se haya cargado correctamente
                            // Asigna el nombre y la imagen a los elementos correspondientes
                            pElements[i].textContent = actor.name;
                            imgElements[i].src = img.src;  // Establece el src de la imagen en imgElements
                            i++;  // Incrementa el índice después de asignar la imagen
                        };

                        img.onerror = () => {  // Maneja el caso en el que la imagen no pueda cargarse
                            console.error('Error al cargar la imagen:', actor.pictureUrl);
                            // Puedes colocar una imagen por defecto o un mensaje de error
                            imgElements[i].src = 'ruta/a/imagen/por/defecto.jpg';
                        };
                    });
                });
            }

        })
        prepararRotacion()

    });
});
