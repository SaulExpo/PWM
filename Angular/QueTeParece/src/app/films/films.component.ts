import {Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import {RouterLink} from "@angular/router";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth, db} from "../services/firebase-config";
import { CommonModule } from '@angular/common';  // Importa CommonModule
import {collection, doc, getDoc, getDocs, setDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-films',
  imports: [RouterLink, CommonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})

export class FilmsComponent implements OnInit {
    constructor(private renderer: Renderer2) {}

    films: { Category: string; Title: string; CoverUrl: string}[] = [];
    AnimationFilms:{ Category: string; Title: string; CoverUrl: string}[] = [];
    LiveFilms: { Category: string; Title: string; CoverUrl: string}[] = [];

    ngOnInit() {
        this.initializeOnAuthStateChanged();
        this.prepararRotacion();
    }

    prepararRotacion() {
        // Obtener todos los botones con la clase .t-button-right
        const buttons = document.querySelectorAll('.t-button-right');

        buttons.forEach((button: any) => {
            this.renderer.listen(button, 'click', () => {
                // Obtener el contenedor de las imágenes
                const container = button.parentElement.firstElementChild;

                // Mover la primera imagen al final del contenedor
                const firstImage = container.firstElementChild;
                container.appendChild(firstImage);
            });
        });
    }

    private async initializeOnAuthStateChanged() {
        try {
            // Obtén la colección 'films' de Firestore
            const docRef = collection(db, 'films');
            const collections = await getDocs(docRef);

            // Crear un array para almacenar los datos de todos los documentos
            this.films = [];

            // Itera sobre los documentos de la colección
            collections.forEach((document) => {
                const documentData = document.data();  // Obtener los datos del documento

                // Obtener las propiedades 'Category' y 'Title' del documento
                let categoryDb = documentData?.['Category'];
                let titleDb = documentData?.['Title'];
                let coverDb = documentData?.['CoverUrl'];

                // Si los datos existen, agrégalo al array 'films'
                if (categoryDb && titleDb && coverDb) {
                    this.films.push({ Category: categoryDb, Title: titleDb , CoverUrl: coverDb});
                }
            });
            this.AnimationFilms = this.films.filter(film => film.Category === "Animation");
            this.LiveFilms = this.films.filter(film => film.Category === "Live-Action");

        } catch (error) {
            console.error('Error al obtener los documentos: ', error);
        }
    }

}