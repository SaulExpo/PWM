import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {HeaderComponent} from "../../components/header/header.component";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {NgIf} from "@angular/common";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, NavigationComponent, FooterComponent, NgIf]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
