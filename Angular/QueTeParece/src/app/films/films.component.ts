import {Component, ElementRef, OnInit, ViewChildren,QueryList, Renderer2 } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
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
    @ViewChildren('buttonRef') buttonsRef!: QueryList<any>;
    constructor(private renderer: Renderer2, private route: ActivatedRoute) {}

    categoryType: string | null = null;
    films: { Category: string; Title: string; CoverUrl: string, type: string, Id:string}[] = [];
    AnimationFilms:{ Category: string; Title: string; CoverUrl: string, type: string, Id:string}[] = [];
    LiveFilms: { Category: string; Title: string; CoverUrl: string, type: string, Id:string}[] = [];

    ngOnInit() {
        this.initializeOnAuthStateChanged();
        this.route.queryParams.subscribe(params => {
            this.categoryType = params['name'];  // Obtén el parámetro 'name' de la URL
        });
    }

    ngAfterViewInit(): void {
        // Ahora que la vista está completamente inicializada, podemos trabajar con @ViewChildren
    }

    prepararRotacion() {
        this.buttonsRef.forEach((button: any, index: number) => {
            this.renderer.listen(button.nativeElement, 'click', () => {
                const container = button.nativeElement.parentElement.parentElement.firstElementChild;
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
                let typeDb = documentData?.['type'];
                let idDb = documentData?.['id'];
                let filmIdDb = document.id;

                // Si los datos existen, agrégalo al array 'films'
                if (categoryDb && titleDb && coverDb) {
                    this.films.push({ Category: categoryDb, Title: titleDb , CoverUrl: coverDb, type: typeDb, Id:filmIdDb});
                }
            });
            if (this.categoryType !== undefined) {
                this.films = this.films.filter(film => film.type === this.categoryType)
            }
            this.AnimationFilms = this.films.filter(film => film.Category === "Animation");
            this.LiveFilms = this.films.filter(film => film.Category === "Live-Action");

            setTimeout(() => {
                this.prepararRotacion();
            });


        } catch (error) {
            console.error('Error al obtener los documentos: ', error);
        }
    }

}