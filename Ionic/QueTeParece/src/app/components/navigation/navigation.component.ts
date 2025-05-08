import { Component, OnInit } from '@angular/core';
import {IonRouterLinkWithHref} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [
    IonicModule,RouterLink
  ]
})
export class NavigationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
