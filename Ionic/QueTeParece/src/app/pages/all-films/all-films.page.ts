import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-all-films',
  templateUrl: './all-films.page.html',
  styleUrls: ['./all-films.page.scss'],
  imports: [
    IonContent
  ],
  standalone:true
})
export class AllFilmsPage implements OnInit {
  LiveFilms=[];
  AnimationFilms= [];


  constructor() { }

  ngOnInit() {
  }

}
