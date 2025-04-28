import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth, db} from "../services/firebase-config";
import {collection, doc, getDoc} from "@angular/fire/firestore";
import {signOut} from "@angular/fire/auth";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-profile',
  imports: [RouterLink, NgForOf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  @ViewChild('userNameDiv', { static: false }) userNameDiv!: ElementRef;
  films: { Category: string; Title: string; CoverUrl: string, type: string, id:string, filmId:string}[] = [];

  ngOnInit() {
    this.initializeOnAuthStateChanged();
  }

  private initializeOnAuthStateChanged() {
    onAuthStateChanged(auth, async(user: User|null)=>{
      if(user){
        const docRef = doc(db, `users/${user.uid}`);
        const document = await getDoc(docRef);
        const userData = document.data();  // Obtener los datos del documento

        let nameDb = userData?.['nombre'];
        let surnameDb = userData?.['apellido'];
        console.log(userData?.['films']);
        let filmDb = userData?.['films']

        if (this.userNameDiv && nameDb) {
          this.userNameDiv.nativeElement.textContent = nameDb +"  "+ surnameDb;
        }
        this.films = await Promise.all(
            filmDb.map(async (filmId:string) => {
              const filmRef = doc(db, `films/${filmId}`);
              const filmSnap = await getDoc(filmRef);

              return {
                filmId: filmId,
                ...filmSnap.data()
              };
            })
        );
        console.log(this.films);
      }
    });
  }

  logOut($event: any) {
    signOut(auth)
        .then(() => {
          console.log("Sesión cerrada correctamente.");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
  }

}
