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
        document.getElementById("LoginText").textContent = "Cerrar Sesión"
    }


}

