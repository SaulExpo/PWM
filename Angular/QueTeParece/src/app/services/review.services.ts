import {Injectable} from "@angular/core";
import {addDoc, collection, deleteDoc, doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {Review} from "../review.model";
import {Observable} from "rxjs";


@Injectable({
    providedIn: "root",
})

export class reviewService {
    constructor(private firestore: Firestore) {
    }

    getReviewByID(id: string) {
        const reviewRef= doc(this.firestore, `reviews/${id}`);
        return docData(reviewRef, { idField: 'id' }) as Observable<Review>;
    }

    addReview(review: Review){
        const reviewRef = collection(this.firestore, `reviews`);
        return addDoc(reviewRef, review);
    }

    deleteReview(review: Review) {
        const reviewDocRef = doc(this.firestore, `reviews/${review.id}`);
        return deleteDoc(reviewDocRef);
    }

    updateReview(review: Review) {
        const reviewDocRef = doc(this.firestore, `films/${review.id}`);
        return setDoc(reviewDocRef, review);
    }
}

