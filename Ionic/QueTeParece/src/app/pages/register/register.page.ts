import { Component, OnInit } from '@angular/core';
import {IonContent} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../services/firebase-config";
import { doc, setDoc } from 'firebase/firestore';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonContent,
    FormsModule
  ],
  standalone:true
})
export class RegisterPage implements OnInit {

  name="";
  surname= "";
  email= "";
  password= "";


  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log('Nombre:', this.name);
    console.log('Apellido:', this.surname);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuario registrado exitosamente:', user); //Si no lo hacia asi me daba error o no se me cambiaba la página
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al registrar el usuario:', errorCode, errorMessage);
      });
  }
}
