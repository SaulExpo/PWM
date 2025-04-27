import {Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';  // Importa CommonModule
import {collection, getDocs} from "@angular/fire/firestore";
import {db} from "../services/firebase-config";

@Component({
  selector: 'app-nav',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  films: { Category: string; Title: string; CoverUrl: string; type: string, Id:string }[] = [];
  filteredfilms: { Category: string; Title: string; CoverUrl: string; type: string, Id:string }[] = [];
  suggestionsVisible: boolean = true;

  ngOnInit() {
    this.loadFilms();
  }

  async loadFilms() {
    try {
      const docRef = collection(db, 'films');
      const collections = await getDocs(docRef);

      this.films = [];


      collections.forEach((document) => {
        const data = document.data();
        if (data?.['Category'] && data?.['Title'] && data?.['CoverUrl']) {
          this.films.push({
            Category: data['Category'],
            Title: data['Title'],
            CoverUrl: data['CoverUrl'],
            type: data['type'],
            Id:document.id
          });
        }
      });

    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
  }

  onSearch(query: string) {
    const lowerQuery = query.toLowerCase();
    this.filteredfilms = this.films.filter(film =>
        film.Title.toLowerCase().includes(lowerQuery)
    );
    this.suggestionsVisible = this.filteredfilms.length > 0;
  }
  onBlur(): void {
    this.suggestionsVisible = false; // Oculta las sugerencias
  }

  // Función que se llama cuando el input obtiene el foco
  onFocus(): void {
    this.suggestionsVisible = this.filteredfilms.length > 0; // Muestra las sugerencias si hay resultados
  }

}

