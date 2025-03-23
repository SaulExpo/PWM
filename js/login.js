async function login(user) {
    if (user.Name != null){
        localStorage.setItem('LOGGED', 'true');
        localStorage.setItem('NAME', user.Name);
        localStorage.setItem('SURNAME', user.Surname);
        localStorage.setItem('EMAIL', user.email);
        localStorage.setItem('PASSWORD', user.password);
        localStorage.setItem('PPICTURE', user.ProfilePicture);
        setTimeout(() => {
            window.location.href = `../HTML Pages/profile.html`;
        }, 100);
    } else{
        console.log("USUARIO NO VALIDO")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('form-style').addEventListener('submit', async function(e) {
            e.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;


        getUser(email, password).then(user => {
            login(user);
        })

    });
});

