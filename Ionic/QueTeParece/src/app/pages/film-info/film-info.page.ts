import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IonContent} from "@ionic/angular/standalone";
import { onAuthStateChanged} from 'firebase/auth';
import {auth, db} from "../../services/firebase-config";
import {collection, doc, getDoc, getDocs, updateDoc} from "@angular/fire/firestore";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.page.html',
  styleUrls: ['./film-info.page.scss'],
  imports: [
    IonContent,
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class FilmInfoPage implements OnInit {
  filmId: string | null = null;
  filmData: any = null;
  filmRefDb: any;
  stars: number[] = [];
  review: string ="";
  reviews: {user: string, review: string}[] =[];
  asociada: boolean = false;
  actors: {name: string, photo: string}[]=[];

  constructor(private route: ActivatedRoute) {
    this.verificarAsociacion();
  }
  async verificarAsociacion() {
    onAuthStateChanged(auth, async(user)=> {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data() as any;
          this.asociada = data.films?.includes(this.filmId) || false;
        } else {
          console.error('Usuario no encontrado.');
          this.asociada = false;
        }
      }
    });
  }

  async checkAsociacion() {
    onAuthStateChanged(auth, async(user)=> {
      if (user) {
        const docRef = doc(db, `users/${user.uid}`);
        const userSnap = await getDoc(docRef);

        if (userSnap.exists()) {
          const data = userSnap.data() as any;
          this.asociada = data.films?.includes(this.filmId) || false;
        }
      }
    });
  }

  get textoBoton(): string {
    return this.asociada ? 'Eliminar película de favoritos' : 'Añadir película a favoritos';
  }


  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.filmId = params['id'];
      if (this.filmId) {
        const filmRef = doc(db, 'films', this.filmId);
        const filmSnap = await getDoc(filmRef);

        if (filmSnap.exists()) {
          this.filmData = filmSnap.data();
          this.filmRefDb = filmSnap.ref;
          this.stars = Array(this.filmData.Valoration).fill(1);

          const filmref = collection(this.filmRefDb, 'reviews')
          const filmsReviews = await getDocs(filmref);
          filmsReviews.forEach((doc )=>{
              let reviewData = doc.data() as Review; // Aquí lo casté como Review
              console.log(reviewData);
              let review = {user: reviewData.userName.nombre, review: reviewData.review};
              this.reviews.push(review)
            }
          );

          await this.showActors();
        } else {
          console.error('Película no encontrada.');
        }
      }
    });
  }


  async showActors(){
    const actorsRef = collection(db,'actors');
    const actorsData = await getDocs(actorsRef);
    this.actors=[];

    const allActors: { name: string; photo: string }[] = [];
    actorsData.forEach(actor=>{
        const data = actor.data();
        console.log(data['name'])
        allActors.push({name:data['name'], photo: data['pictureUrl']});
      }
    )
    const shuffled = allActors.sort(() => 0.5 - Math.random());
    this.actors = shuffled.slice(0, 4);
  }

  callCreateReview() {
    //TODO implementar el CRUD que teniamos en angular pero tengo la duda de si hacerlo en SQLite o poner el que teníamos
  }
}

interface UserModel {
  nombre: string;
  apellido: string;
}

interface Review {
  userName: UserModel;
  review: string;
}


