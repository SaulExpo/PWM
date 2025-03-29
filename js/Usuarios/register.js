Promise.all([
    loadTemplate_class("../templates/text-and-image-logo.html", 'text-and-logo'),
]).then(() => {
    document.getElementsByClassName('register-form')[0].addEventListener('submit', async function(e) {
        e.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(name, surname, email, password);

        // Crear el objeto que se enviará a Strapi
        const formData = {
            data: {
                Name: name,
                Surname: surname,
                email: email,
                password: password
            }
        };

        let valid = true;

        let nameError = document.getElementById('nameError');
        let surnameError = document.getElementById('surnameError');
        let emailError = document.getElementById('emailError');
        let passwordError = document.getElementById('passwordError');

        nameError.textContent = "";
        surnameError.textContent = "";
        passwordError.textContent = "";
        emailError.textContent = "";

        if (name.length < 3) {
            nameError.textContent = 'El nombre debe ser de al menos 3 caracteres.';
            valid = false;
        }

        if (/^[A-Z]/.test(name) === false) {
            nameError.textContent = 'El nombre no empieza por mayúscula.';
            valid = false;
        }

        if (surname.length === 0) {
            surnameError.textContent = 'Ingrese un apellido.';
            valid = false;
        }

        if (/^[A-Z]/.test(surname) === false) {
            surnameError.textContent = 'El apellido no empieza por mayúscula.';
            valid = false;
        }

        if (password.length < 6) {
            passwordError.textContent = 'El tamaño de la contraseña debe de ser de al menos 6 caracteres.';
            valid = false;
        }

        if(/[A-Z]/.test(password) === false){
            passwordError.textContent = 'La contraseña no tiene ninguna mayúscula.';
            valid = false;
        }

        if(/[0-9]/.test(password) === false){
            passwordError.textContent = 'La contraseña no tiene ningún número.';
            valid = false;
        }

        if (!isValidEmail(email)) {
            emailError.textContent = 'El email no tiene un formato valido.';
            valid = false;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }


        console.log(formData)
        if (valid == true){
            try {
                // Enviar los datos a Strapi usando fetch (puedes usar axios también)
                const response = await fetch('http://localhost:1337/api/app-users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                console.log(valid)
                const result = await response.json();

                if (response.ok) {
                    // Procesar la respuesta de Strapi
                    getUser(email, password).then(user => {login(user)});
                } else {
                    console.error('Error de respuesta:', result);
                }
            } catch (error) {
                console.error('Error al enviar los datos a Strapi:', error);
            }
        }
    });


})
