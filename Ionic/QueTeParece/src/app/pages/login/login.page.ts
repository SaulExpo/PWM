import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../services/firebase-config";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    FormsModule
  ]
})
export class LoginPage implements OnInit {
  email= "";
  password= "";


  constructor() { }

  ngOnInit() {
  }

  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuario registrado exitosamente:', user);
      })
      .catch((error) => {
        console.error("❌ Error en el login:", error.message);
      });
  }
}
