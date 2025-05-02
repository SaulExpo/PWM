import {Component, OnInit} from '@angular/core';
import {db, auth} from '../../services/firebase-config';
import {collection, getDoc, getDocs} from "@angular/fire/firestore";
import {NgForOf, NgIf} from "@angular/common";
import {onAuthStateChanged} from "firebase/auth";
import {deleleReview,saveReview} from "../../reviews/reviewCRUD";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-reviews',
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './edit-reviews.component.html',
  styleUrl: './edit-reviews.component.css'
})
export class EditReviewsComponent implements OnInit {
  reviews: {film: string, review: string}[] =[];
  isEditing: number | null = null;
  async ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const reviewsRef = collection(db, 'users', user.uid, 'reviews');
          const reviewsDocs = await getDocs(reviewsRef);

          const promises = reviewsDocs.docs.map(async (doc) => {
            let filmRef = doc.data()?.['filmRef'];
            let film = await getDoc(filmRef);
            let filmData = film.data() as { Title: string };
            let filmTitle = filmData.Title;
            const review = {film : filmTitle, review: doc.data()?.['review']} as Review;
            this.reviews.push(review);
          })
          await Promise.all(promises);
        }catch (error) {
          console.log(error);

      }
      }
    });
  }

  //Funciones para la vista
  callUpdateReview(index:number){
    this.isEditing = index;
  }

  callSaveReview(index:number){
    saveReview(index, this.reviews[index].review);
    this.isEditing = null;
  }

  callDeleleReview(index:number){
    deleleReview(index);
  }
}


interface Review {
  film: string;
  review: string;
}

