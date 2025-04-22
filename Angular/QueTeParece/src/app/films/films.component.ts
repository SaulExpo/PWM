import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    films: { Category: string; Title: string; CoverUrl: string}[] = [];

    ngOnInit() {
        this.initializeOnAuthStateChanged();
    }

    private initializeOnAuthStateChanged() {
        onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
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
                } catch (error) {
                    console.error('Error al obtener los documentos: ', error);
                }
            }
        });
    }
}