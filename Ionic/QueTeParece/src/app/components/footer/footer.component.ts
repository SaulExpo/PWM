import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {IonFooter} from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    RouterLink,
  ]
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
