import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../services/firebase-config";
import {RouterLink, Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    FormsModule,
    RouterLink
  ]
})
export class LoginPage implements OnInit {
  email= "";
  password= "";


  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuario registrado exitosamente:', user);
        this.router.navigateByUrl('/home', { replaceUrl: true });
      })
      .catch((error) => {
        console.error("❌ Error en el login:", error.message);
      });
  }

  loginRedirect() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }
}
