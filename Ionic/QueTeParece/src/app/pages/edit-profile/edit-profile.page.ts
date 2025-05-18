import { Component, OnInit } from '@angular/core';
import {onAuthStateChanged, User} from "firebase/auth";
import {doc, getDoc, setDoc} from "@angular/fire/firestore";
import {updatePassword} from "@angular/fire/auth";
import {auth, db} from "../../services/firebase-config";
import {HeaderComponent} from "../../components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  imports: [
    HeaderComponent,
    IonicModule,
    NavigationComponent,
    FooterComponent,
    FormsModule
  ]
})
export class EditProfilePage implements OnInit {
  protected user: { name: string; surname: string; email: string; password: string };


  constructor() {
    this.user = {
      name: '',
      surname: '',
      email: '',
      password: '',
    };
  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Datos del formulario: ', this.user);
    this.initializeOnAuthStateChanged();
  }

  initializeOnAuthStateChanged(){
    onAuthStateChanged(auth, async(user: User|null) => {
      if (user){
        const docRef = doc(db, `users/${user.uid}`);
        const document = await getDoc(docRef);
        const userData = document.data();

        let nameDb = userData?.['nombre'];
        let surnameDb = userData?.['apellido'];

        if (this.user.name && nameDb !== this.user.name) {
          await setDoc(docRef, { nombre: this.user.name }, {merge : true})
        }

        if (this.user.surname && surnameDb !== this.user.surname){
          await setDoc(docRef, {apellido: this.user.surname}, {merge:true});
        }

        if (this.user.password !== ''){
          try {
            await updatePassword(user, this.user.password);
            window.location.href="./profile"
          }catch(error){
            console.log(error);
          }
        }
      }
    });
  }

  protected readonly onsubmit = onsubmit;
  protected readonly Event = Event;
}
