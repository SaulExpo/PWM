import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IonContent} from "@ionic/angular/standalone";
import {onAuthStateChanged, User} from 'firebase/auth';
import {auth, db} from "../../services/firebase-config";
import {collection, doc, getDoc, getDocs, updateDoc, arrayRemove, arrayUnion} from "@angular/fire/firestore";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {createReview} from "../../services/reviewCRUD";
import {DatabaseService} from "../../services/dataBase";
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.page.html',
  styleUrls: ['./film-info.page.scss'],
  imports: [
    IonContent,
    NgForOf,
    NgIf,
    FormsModule,
    FooterComponent,
    HeaderComponent,
    NavigationComponent
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
  favoritosIds: string[] = [];
  isWeb: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {
  }
  async verificarAsociacionWeb() {
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

  async verificarAsociacionMovil() {
    onAuthStateChanged(auth, async(user)=> {
      if (user) {
        this.favoritosIds = await this.databaseService.getFavoritos(user.uid);
        if (this.filmId && this.favoritosIds.includes(this.filmId)) {
          this.asociada = true;
        } else{
          this.asociada = false;
        }
      }
    });
  }


  get textoBoton(): string {
    return this.asociada ? 'Eliminar película de favoritos' : 'Añadir película a favoritos';
  }


  async ngOnInit() {
    this.isWeb = Capacitor.getPlatform() === 'web';
    this.route.queryParams.subscribe(async params => {
      this.filmId = params['id'];
      if(this.isWeb){
        console.log("A")
        this.verificarAsociacionWeb();
      } else{
        this.verificarAsociacionMovil()
      }
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
        allActors.push({name:data['name'], photo: data['pictureUrl']});
      }
    )
    const shuffled = allActors.sort(() => 0.5 - Math.random());
    this.actors = shuffled.slice(0, 4);
  }

  async callCreateReview() {
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
  async alternarAsociacionWeb() {
    onAuthStateChanged(auth, async(user: User|null)=>{
      if(user){
        const docRef = doc(db, `users/${user.uid}`);
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
  async alternarAsociacionMovil() {
    onAuthStateChanged(auth, async(user: User|null)=>{
      if(user && this.filmId){

        if (this.asociada){
          await this.databaseService.eliminarFavorito(user.uid, this.filmId);
        } else {
          await this.databaseService.agregarFavorito(user.uid, this.filmId);
        }

        // Actualizar el estado después de la operación
        this.asociada = !this.asociada;
      }
    });
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




