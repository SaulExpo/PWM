import { Component } from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {auth} from '../services/firebase-config';
import {signInWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string ="";
  password: string ="";

  constructor(private router: Router) {}

  login() {
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
    signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario registrado exitosamente:', user);
          this.router.navigate(['']);
        })
        .catch((error) => {
          console.error("❌ Error en el login:", error.message);
        });
  }

}
