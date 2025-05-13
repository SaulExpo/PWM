import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonRouterLinkWithHref} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {onAuthStateChanged, User} from "firebase/auth";
import firebase from "firebase/compat";
import {doc, getDoc} from "@angular/fire/firestore";
import {db, auth} from "../../services/firebase-config";
import {signOut} from "@angular/fire/auth";
import {HeaderComponent} from "../../components/header/header.component";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    IonRouterLinkWithHref,
    IonicModule,
    NgForOf,
    RouterLink,
    HeaderComponent,
    NavigationComponent,
    NgIf,
    FooterComponent,
  ]
})
export class ProfilePage implements OnInit {

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
