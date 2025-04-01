import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NavComponent} from './nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']  // Debe ser styleUrls, no styleUrl
})
export class AppComponent {
  title = 'QueTeParece';
}
