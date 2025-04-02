import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

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

  register(): void {
    console.log('Nombre:', this.name);
    console.log('Apellido:', this.surname);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
  }
}
