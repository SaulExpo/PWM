function LoadFilm_categories(films, categoryType) {
    // Obtener las categorías únicas
    const uniqueEnumerates = new Set(films.map(item => item.Category));
    const uniqueArray = [...uniqueEnumerates];

    let sectionsHTML = "";

    // Función para contar elementos por categoría
    const countEnumerates = (data) => {
        const count = {};

        films.forEach(item => {
            const value = item.Category;
            if (count[value]) {
                count[value] += 1;
            } else {
                count[value] = 1;
            }
        });

        return count;
    };

    const result = countEnumerates(films); // Obtenemos el conteo de elementos por categoría

    // Para que puedas acceder como result[i], puedes hacer un array con las claves (categorías)
    const categories = Object.keys(result); // Aquí obtenemos un array con los nombres de las categorías

    // Generar las secciones HTML basadas en las categorías
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]; // Accede a la categoría por índice
        const count = result[category]; // Número de elementos de esa categoría

        // Crear las imágenes según la cantidad de elementos en la categoría
        let imagesHTML = "";
        for (let j = 0; j < count; j++) {
            imagesHTML += `<section class="image-title"></section>`; // Cambia el path de las imágenes según tu necesidad
        }

        // Agregar la categoría y las imágenes a la sección HTML
        sectionsHTML += `
            <a class="category-button" href="films.html"><h1 class="image-and-text-h1">${category}</h1></a>
            <article class="c-right-arrow">
                <div class="images">
                    ${imagesHTML}
                </div>
                <section class="t-button-right"></section>
            </article>
        `;
    }

    // Insertar el contenido generado en el main
    document.getElementsByTagName("main")[0].innerHTML = sectionsHTML;

    // Mostrar el conteo de categorías en la consola (esto es opcional)
    console.log(result);

    let containers = document.querySelectorAll(".c-right-arrow");
    console.log("CONTAINERS", containers);
    let i = 0
    Promise.all([,
        loadTemplate_class("../templates/image-and-text-under.html", 'image-title'),
        loadTemplate_class("../templates/triangular-button-right.html", 't-button-right'),
    ]).then(() => {
    containers.forEach((container) => {
        console.log(i);
        console.log(categories[i])
        const pElements = container.querySelectorAll('.image-title p'); // Selecciona todos los <p> dentro de #X
        const imgElements = container.querySelectorAll('.image-title img'); // Selecciona todos los <p> dentro de #X
        console.log(imgElements);
        let j= 0
        films.forEach((film) => {
            if (film.Category == categories[i]){
                // Verificamos si hay un <p> para reemplazar
                if (pElements[j]) {
                    // Cambiamos el contenido de cada <p> por la descripción de la película
                    pElements[j].textContent = film.Title;
                }
                if (imgElements[j]) {
                    // Cambiamos el contenido de cada <p> por la descripción de la película
                    imgElements[j].src = film.CoverUrl;
                }
                j++
            }
        });
        i +=1
        imgElements.forEach(img => {
            img.addEventListener('click', function(event) {
                let film_name = img.parentNode.parentNode.lastElementChild.textContent;
                event.preventDefault();

                // Obtener el src de la imagen
                const imgname = encodeURIComponent(film_name); // Codificar URL para evitar problemas
                // Redirigir a la página de detalles con el src como parámetro
                window.location.href = `../HTML Pages/film-info.html?name=${imgname}&category=${categoryType}`;
            });
        });
        const Categories = document.querySelectorAll('.category-button'); // Selecciona todos los <p> dentro de #X
        Categories.forEach(category => {
            category.addEventListener('click', function(event) {
                let cat_name = category.textContent;
                console.log(cat_name);
                event.preventDefault();

                // Redirigir a la página de detalles con el src como parámetro
                window.location.href = `../HTML Pages/films.html?category=${cat_name}`;
            });
        });
    })
    })



}