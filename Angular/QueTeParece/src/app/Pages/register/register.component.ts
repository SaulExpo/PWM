import { Component } from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {auth, db} from '../../services/firebase-config';
import {createUserWithEmailAndPassword} from "@angular/fire/auth";
import {doc, setDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';

  //TODO comprobar q esto es correcto
  constructor(private router: Router) {} //inyecto router al constructor para poder utilizarlo en el registro al redireccionar al user

  register() {
    console.log('Nombre:', this.name);
    console.log('Apellido:', this.surname);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);

    createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario registrado exitosamente:', user);

          const usersCollection = doc(db, `users/${userCredential.user.uid}`);
          setDoc(usersCollection, {
            nombre: this.name,
            apellido: this.surname
          });
          this.router.navigate(['']);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error al registrar el usuario:', errorCode, errorMessage);
        });
  }
}
