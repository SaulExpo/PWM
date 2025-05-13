import firebase from "firebase/compat";
import {onAuthStateChanged} from "firebase/auth";
import {collection, doc, getDoc, setDoc} from "@angular/fire/firestore";
import {db, auth} from "./firebase-config";


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
