import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonRouterLinkWithHref} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {onAuthStateChanged, User} from "firebase/auth";
import {doc, getDoc} from "@angular/fire/firestore";
import {db, auth} from "../../services/firebase-config";
import {signOut} from "@angular/fire/auth";
import {HeaderComponent} from "../../components/header/header.component";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {Capacitor} from "@capacitor/core";
import {DatabaseService} from "../../services/dataBase";

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
    FooterComponent,
  ]
})
export class ProfilePage implements OnInit {

  @ViewChild('userNameDiv', { static: false }) userNameDiv!: ElementRef;
  films: { Category: string; Title: string; CoverUrl: string, type: string, id:string, filmId:string, esFavorito: boolean}[] = [];
  private isWeb: boolean = false;
  favoritosIds: string[] = [];

  ngOnInit() {
    this.isWeb = Capacitor.getPlatform() === 'web';
    this.initializeOnAuthStateChanged();
  }

  constructor(
    private routerLink:Router,
    private databaseService: DatabaseService
  ) {}

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

        console.log(filmDb);
        if (!this.isWeb) {
          this.favoritosIds = await this.databaseService.getFavoritos(user.uid);

          // Obtener los datos de esas películas favoritas desde Firestore
          this.films = await Promise.all(
            this.favoritosIds.map(async (favId: string) => {
              const filmRef = doc(db, `films/${favId}`);
              const filmSnap = await getDoc(filmRef);
              const filmData = filmSnap.data();

              return {
                Category: filmData?.['Category'] || '',
                Title: filmData?.['Title'] || '',
                CoverUrl: filmData?.['CoverUrl'] || '',
                type: filmData?.['type'] || '',
                id: filmData?.['id'] || '',
                filmId: favId,
                esFavorito: true
              };
            })
          );
        } else {
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
        }
      }
    });
  }

  logOut($event: any) {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada correctamente.");
        this.routerLink.navigateByUrl(`/home`, { replaceUrl: true });
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  }
  filmRedirect(Id: string) {
    this.routerLink.navigateByUrl(`/filmInfo?id=${Id}`, { replaceUrl: true });
  }

  editProfileRedirect() {
    this.routerLink.navigateByUrl(`/editProfile`, { replaceUrl: true });
  }

}

