import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import {NgIf} from "@angular/common";
import {HeaderComponent} from "./Components/header/header.component";
import {FooterComponent} from "./Components/footer/footer.component";
import {NavComponent} from "./Components/nav/nav.component";
import {CarouselComponent} from "./Components/carousel/carousel.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavComponent, CarouselComponent, NgIf],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']  // Debe ser styleUrls, no styleUrl
})


export class AppComponent {
  title = 'QueTeParece';
  showHeaderFooter: boolean = true;  // Inicialmente, mostramos header y footer

  constructor(private router: Router) {
    // Escuchamos los cambios de rutas
    this.router.events.subscribe(() => {
      if (this.router.url === '/login' || this.router.url === '/register') {
        this.showHeaderFooter = false;  // Ocultamos header y footer si estamos en la ruta /login
      } else {
        this.showHeaderFooter = true;   // Mostramos header y footer en otras rutas
      }
    });
  }
}