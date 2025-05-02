import {Component, OnInit} from '@angular/core';
import {collection, doc, getDoc, getDocs, updateDoc, arrayRemove, arrayUnion} from "@angular/fire/firestore";
import {auth, db} from "../services/firebase-config";
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {createReview} from "../reviews/reviewCRUD";
import {onAuthStateChanged, User} from "firebase/auth";

@Component({
  selector: 'app-film-info',
    imports: [CommonModule, FormsModule],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css'
})
export class FilmInfoComponent implements OnInit {
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
    onAuthStateChanged(auth, async(user: User|null)=> {
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

  async alternarAsociacion() {
    onAuthStateChanged(auth, async(user: User|null)=>{
      if(user){
        const docRef = doc(db, `users/${user.uid}`);
        console.log(document)
        if (this.asociada) {
          // Si ya está asociada ➔ eliminar
          await updateDoc(docRef, {
            films: arrayRemove(this.filmId)
          });
          console.log('Película desasociada del usuario.');
        } else {
          // Si no está asociada ➔ agregar
          await updateDoc(docRef, {
            films: arrayUnion(this.filmId)
          });
          console.log('Película asociada al usuario.');
        }

        // Actualizar el estado después de la operación
        this.asociada = !this.asociada;
      }
    });

    
  }

  async checkAsociacion() {
    onAuthStateChanged(auth, async(user: User|null)=> {
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

  async callCreateReview(){
    await createReview(this.filmRefDb, this.review);
    await this.refreshReviews();
  }

  async refreshReviews() {
    const reviewsRef = collection(this.filmRefDb, 'reviews');
    const reviewsSnap = await getDocs(reviewsRef);
    this.reviews = [];

    reviewsSnap.forEach((doc) => {
      let reviewData = doc.data() as Review;
      this.reviews.push({ user: reviewData.userName.nombre, review: reviewData.review });
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

}

interface UserModel {
  nombre: string;
  apellido: string;
}

interface Review {
  userName: UserModel;
  review: string;
}

