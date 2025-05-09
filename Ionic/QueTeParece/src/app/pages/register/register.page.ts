import { Component, OnInit } from '@angular/core';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../services/firebase-config";
import {Router} from "@angular/router";
import{DatabaseService} from "../../services/dataBase";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonicModule,
    FormsModule

  ],
  standalone:true
})
export class RegisterPage implements OnInit {

  name="";
  surname= "";
  email= "";
  password= "";


  constructor(private router: Router, private dbService: DatabaseService) { }

  ngOnInit() {
  }

  register() {
    console.log('Nombre:', this.name);
    console.log('Apellido:', this.surname);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await this.dbService.addUser(this.name, this.surname);

        console.log('Usuario registrado exitosamente:', user); //Si no lo hacia asi me daba error o no se me cambiaba la página
        await this.router.navigateByUrl('/login', {replaceUrl: true});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al registrar el usuario:', errorCode, errorMessage);
      });
  }

  homeRedirect() {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
