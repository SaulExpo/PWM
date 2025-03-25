Promise.all([
    loadTemplate_class("../templates/text-and-image-logo.html", 'text-and-logo'),
]).then(() => {
    document.getElementById('form-style').addEventListener('submit', async function(e) {
        e.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(name, surname, email, password);

        const formData = {
            data: {
                Name: name,
                Surname: surname,
                email: email,
                password: password
            }
        };
        console.log(formData)
        if(formData.data.Name.length < 3){
            alert('El nombre debe ser de al menos 3 caracteres');
            return;
        }

        if(formData.data.Surname.length === 0){
            alert('Ingrese un apellido');
            return;
        }

        if(formData.data.password.length <= 6){
            alert('El tamaño de la contraseña debe de ser de al menos 6 caracteres');
            return;
        }


        try {
            // Enviar los datos a Strapi usando fetch (puedes usar axios también)
            const response = await fetch('http://localhost:1337/api/app-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Procesar la respuesta de Strapi
                alert('Formulario enviado correctamente');
                getUser(email, password).then(user => {login(user)});
            } else {

                alert('Hubo un error al enviar el formulario');
                console.error('Error de respuesta:', result);
            }
        } catch (error) {
            console.error('Error al enviar los datos a Strapi:', error);
        }
    });

})