import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {auth} from '../services/firebase-config';

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

  login(){
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
  }
}
