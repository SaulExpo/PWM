document.addEventListener('DOMContentLoaded', init);
function loadTemplate(fileName, id, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        //console.log(text)

        if(callback){
            callback();
        }
    })
}

function loadTemplate_class(fileName, className, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        const elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = text;
        }
        if(callback){
            callback();
        }
    })
}


async function init() {

    await loadTemplate("../templates/header.html", 'header');
    await loadTemplate("../templates/nav.html", 'nav');
    await loadTemplate("../templates/footer.html", 'footer');
    await loadTemplate("../templates/image-and-text-right.html", 'image-and-text-right');
    await loadTemplate("../templates/image-and-text-left.html", 'image-and-text-left');
    await loadTemplate("../templates/oval-button.html", 'o-button');
    await loadTemplate("../templates/film.html", 'film');
    await loadTemplate_class("../templates/category-right-arrow.html", 'c-right-arrow');
    await loadTemplate_class("../templates/category.html", 'category');
    await loadTemplate_class("../templates/image-and-text-under.html", 'image-title');
    await loadTemplate_class("../templates/triangular-button-right.html", 't-button-right');
    await loadTemplate_class("../templates/triangular-button-left.html", 't-button-left');
    await loadTemplate_class("../templates/personal-review-read.html", 'read');
    await loadTemplate_class("../templates/personal-review-write.html", 'write');
    await loadTemplate_class("../templates/individual-notification.html", 'notification');
    await loadTemplate_class("../templates/notification-message.html", 'notificacion_mensaje');
}

