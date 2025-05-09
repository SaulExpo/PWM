import { Component, OnInit } from '@angular/core';
import {IonRouterLinkWithHref} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [
        IonicModule, RouterLink
    ]
})
export class NavigationComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  protected readonly onclick = onclick;

  filmRedirect() {
    this.router.navigateByUrl('/allFilms?name=film', { replaceUrl: true });
  }


  allFilmsRedirect() {
    this.router.navigateByUrl('/allFilms', { replaceUrl: true });
  }

  serieRedirect() {
    this.router.navigateByUrl('/allFilms?name=serie', { replaceUrl: true });
  }
}
