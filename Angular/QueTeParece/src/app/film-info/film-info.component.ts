import {Component, OnInit} from '@angular/core';
import {doc, getDoc} from "@angular/fire/firestore";
import {db} from "../services/firebase-config";
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-film-info',
  imports: [CommonModule],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css'
})
export class FilmInfoComponent implements OnInit {
  filmId: string | null = null;
  filmData: any = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.filmId = params['id'];
      if (this.filmId) {
        const filmRef = doc(db, 'films', this.filmId);
        const filmSnap = await getDoc(filmRef);
        if (filmSnap.exists()) {
          this.filmData = filmSnap.data();
          console.log(this.filmData);
        } else {
          console.error('Película no encontrada.');
        }
      }
    });
  }
}