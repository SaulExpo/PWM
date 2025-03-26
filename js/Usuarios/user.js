document.addEventListener("DOMContentLoaded", function() {
    let NAME = localStorage.getItem('NAME')
    let SURNAME = localStorage.getItem('SURNAME')
    let EMAIL = localStorage.getItem('EMAIL')
    let PASSWORD = localStorage.getItem('PASSWORD')
    let PPICTURE = localStorage.getItem('PPICTURE')
    console.log(NAME);

    document.getElementById("UserName").textContent = NAME + " " + SURNAME
    document.querySelector("#profile-picture img").setAttribute('src', PPICTURE);

    document.getElementById("LogOut").addEventListener('click', function(){
        LogOut(NAME, EMAIL)
    })

    getFavourites().then(favourites => {
        const total = favourites.films.length;
        let section = `<section class="image-title"></section>`;
        for (let i = 0; i < total; i++) {
            document.getElementById("category").innerHTML += section
        }
        Promise.all([
            loadTemplate_class("../templates/image-and-text-under.html", 'image-title'),
        ]).then(() => {
            loadFilms(favourites.films);
        })
    })

});


function LogOut(name, email){
    localStorage.setItem('LOGGED', 'false');
    localStorage.setItem('NAME', "");
    localStorage.setItem('SURNAME', "");
    localStorage.setItem('EMAIL', "");
    localStorage.setItem('PASSWORD', "");
    localStorage.setItem('PPICTURE', "");
}