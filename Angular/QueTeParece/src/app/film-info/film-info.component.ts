import {Component, OnInit} from '@angular/core';
import {collection, doc, getDoc, getDocs} from "@angular/fire/firestore";
import {db} from "../services/firebase-config";
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {createReview} from "../reviews/reviewCRUD";

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


  constructor(private route: ActivatedRoute) {}
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
                let reviewData = doc.data() as review;
                let review = {user: reviewData.user, review: reviewData.review} as review;
                this.reviews.push(review)
              }
          );
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
      let reviewData = doc.data() as review;
      console.log("reviews refrescando")
      this.reviews.push({ user: reviewData.user, review: reviewData.review });
    });

  }
}

interface review{
  user: string,
  review: string,
}


