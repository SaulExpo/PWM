import {Component, OnInit} from '@angular/core';
import {auth, db} from '../services/firebase-config';
import { onAuthStateChanged, User, updatePassword } from 'firebase/auth';
import {doc, getDoc, setDoc} from "@angular/fire/firestore";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {reauthenticateWithCredential, updateEmail} from "@angular/fire/auth";



@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})



export class EditProfileComponent {
  user = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Datos del formulario:', this.user);
    this.initializeOnAuthStateChanged();

    // Aquí puedes realizar una acción con los datos, como enviarlos a un servidor
  }



  private initializeOnAuthStateChanged() {
    onAuthStateChanged(auth, async(user: User|null)=>{
      if(user){
        const docRef = doc(db, `users/${user.uid}`);
        const document = await getDoc(docRef);
        const userData = document.data();  // Obtener los datos del documento

        let nameDb = userData?.['nombre'];
        let surnameDb = userData?.['apellido'];

        if (this.user.name && nameDb !== this.user.name) {
          await setDoc(docRef, { nombre: this.user.name }, { merge: true });
        }

        if (this.user.surname && surnameDb !== this.user.surname) {
          await setDoc(docRef, { apellido: this.user.surname }, { merge: true });
        }

        if(this.user.password !== ''){
          try{
            await updatePassword(user, this.user.password);
            window.location.href="./profile"
          } catch(error){
            console.log(error);
          }
        }

      }
    });
  }

  protected readonly onsubmit = onsubmit;
  protected readonly Event = Event;
}
