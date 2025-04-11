import {Injectable} from "@angular/core";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Film} from "../film.model";


@Injectable({
    providedIn: "root",
})

export class filmService {
    constructor(private firestore: Firestore) {
    }

    addFilms(film: Film){
        const filmRef = collection(this.firestore, "films");
        return addDoc(filmRef, film);
    }

    deleteFilm() {
        const filmDocRef = doc(this.firestore, 'films/${film.id}');
        return deleteDoc(filmDocRef);
    }

    updateFilm(film: Film) {
        const filmDocRef = doc(this.firestore, 'films/${film.id}');
        return setDoc(filmDocRef, film);
    }
}

