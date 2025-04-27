import {db, auth} from '../services/firebase-config';
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "@angular/fire/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {DocumentReference} from "@angular/fire/compat/firestore";


//Create
export async function createReview(filmRef: any, review:string,) {
    await new Promise<void>((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {

                    //nuevo documento con reviews en la pelicula
                    const newFilmRef = collection(filmRef, 'reviews');
                    const newFilmDoc = doc(newFilmRef);
                    const userNameRef = doc(db, 'users', user.uid);
                    const userInfo = await getDoc(userNameRef);
                    await setDoc(newFilmDoc, {
                        userRef: user.uid,
                        userName: userInfo.data(),
                        review: review,
                        createdAt: new Date()
                    })


                    //nuevo documento con reviews en el usuario
                    const userRef = collection(db, 'users', user.uid, 'reviews');
                    const newUserDoc = doc(userRef);
                    await setDoc(newUserDoc, {
                        reviewRef: newFilmDoc.id,
                        filmRef: filmRef,
                        review: review,
                        createdAt: new Date()
                    })

                    resolve();
                } catch (e) {
                    reject(e);
                }
            }

        });
    });
}

//Update
export function saveReview(index:number, review:string) {
    const reviews: any[] = [];
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            const reviewsUserRef = collection(db, 'users', user.uid, 'reviews');
            const reviewsUserDocs = await getDocs(reviewsUserRef);
            reviewsUserDocs.forEach((doc) => {
                reviews.push(doc.ref);
            })

            const reviewUserRef = reviews[index];
            const reviewUserDoc = await getDoc(reviewUserRef);
            const filmRef = reviewUserDoc.data() as {filmRef: DocumentReference};
            const reviewRef = reviewUserDoc.data() as {reviewRef: string};

            const reviewFilmRef = doc(filmRef.filmRef,'reviews', reviewRef.reviewRef);

            await updateDoc(reviewUserRef,{
                createdAt: new Date(),
                review: review
            })

            let userName = {
                nombre: userDoc.data()?.['nombre'],
                apellido: userDoc.data()?.['apellido']
            };

            await updateDoc(reviewFilmRef,{
                createdAt: new Date(),
                review: review,
                userName: userName,
            })



        }
    });
}

//Delete
export function deleleReview(index:number){
    console.log(index, "borrada");
}

