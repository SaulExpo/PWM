import {Injectable} from "@angular/core";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
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

    removeFilms(film: Film){
    }

}

