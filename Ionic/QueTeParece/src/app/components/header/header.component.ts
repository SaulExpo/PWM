import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import { auth } from 'src/app/services/firebase-config';
import {onAuthStateChanged} from "@angular/fire/auth";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf
    ]
})
export class HeaderComponent  implements OnInit {
  userLogged= false;

  ngOnInit() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userLogged = true;  // Usuario autenticado
      } else {
        this.userLogged = false; // No hay usuario autenticado
      }
    });
  }

  constructor(private router:Router) {
  }

  loginRedirect() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }


  profileRedirect() {
    this.router.navigateByUrl('/profile', { replaceUrl: true });
  }

  homeRedirect() {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
