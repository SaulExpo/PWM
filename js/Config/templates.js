document.addEventListener('DOMContentLoaded', init);
function loadTemplate(fileName, id, callback) {
    return new Promise((resolve, reject) => {
        fetch(fileName).then((res) => {
            return res.text();
        }).then((text) => {
            document.getElementById(id).innerHTML = text;
            //console.log(text)

            if(callback){
                callback();
            }
            resolve();
        })
            .catch((error) => {
                reject(error); // Rechazamos la promesa en caso de error
                console.error('Error al cargar el template:', error);
            });
    });
}

function loadTemplate_class(fileName, className, callback) {
    return new Promise((resolve, reject) => {
        fetch(fileName)
            .then((res) => {
                if (!res.ok) { // Verificamos si la respuesta es exitosa
                    throw new Error('No se pudo cargar el archivo');
                }
                return res.text();
            })
            .then((text) => {
                const elements = document.getElementsByClassName(className);
                for (let i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = text;
                }
                if (callback) {
                    callback(); // Llamamos al callback si existe
                }
                resolve(); // Resolvemos la promesa después de completar el trabajo
            })
            .catch((error) => {
                reject(error); // Rechazamos la promesa en caso de error
                console.error('Error al cargar el template:', error);
            });
    });
}

async function init() {

    await loadTemplate("../templates/header.html", 'header');
    await loadTemplate("../templates/nav.html", 'nav');
    await loadTemplate("../templates/footer.html", 'footer');
    let LOGGED = localStorage.getItem('LOGGED') === 'true';
    if (LOGGED == true){
        document.getElementById("LoginText").style.display = 'none';
    }
    if (LOGGED == false){
        document.getElementById("LoginText").style.display = 'inline-block';
    }

    document.getElementById("Profile").addEventListener('click', function(e){
        if (LOGGED === false){
            e.preventDefault();
            window.location.href = '../HTML Pages/login.html';
        }
    })
    obtenerFilms().then(items => {
        // Referencias a elementos del DOM
        const searchInput = document.getElementById("search");
        const suggestionsDiv = document.getElementById("suggestions");
        const suggestionsImg = document.getElementById("suggestionsImg");

// Función para filtrar los elementos del array y mostrar los resultados
        function filterSuggestions(query) {
            const filteredItems = items.filter(item => item.Title.toLowerCase().includes(query.toLowerCase()));
            displaySuggestions(filteredItems);
        }

// Función para mostrar las sugerencias
        function displaySuggestions(suggestions) {
            suggestionsDiv.innerHTML = ""; // Limpiar resultados anteriores
            suggestionsImg.innerHTML = ""; // Limpiar resultados anteriores
            if (suggestions.length > 0) {
                suggestions.forEach(item => {
                    const suggestionItem = document.createElement("div");
                    const suggestionTitle = document.createElement("div");
                    const suggestionImg = document.createElement("img");
                    suggestionItem.classList.add("suggestion-item");
                    suggestionImg.src = item.CoverUrl
                    suggestionTitle.textContent = item.Title
                    suggestionItem.onclick = () => {
                        window.location.href = `../HTML Pages/film-info.html?name=${item.Title}`
                    };
                    suggestionsDiv.appendChild(suggestionItem);
                    suggestionItem.appendChild(suggestionImg);
                    suggestionItem.appendChild(suggestionTitle);
                });
            } else {
                suggestionsDiv.innerHTML = "<div class='suggestion-item'>No se encontraron resultados</div>";
            }
        }

// Evento que detecta cuando el usuario escribe en el campo de búsqueda
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                filterSuggestions(query);
            } else {
                suggestionsDiv.innerHTML = ""; // Limpiar cuando el campo de búsqueda esté vacío
            }
        });


    })


}

