import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showHeaderFooter= true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Muestra el header solo en algunas páginas
        this.showHeaderFooter = !['/login', '/register'].includes(event.url);

      }
    });
  }
}
