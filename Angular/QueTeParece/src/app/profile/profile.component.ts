import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth, db} from "../services/firebase-config";
import {doc, getDoc, setDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  @ViewChild('userNameDiv', { static: false }) userNameDiv!: ElementRef;

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

        if (this.userNameDiv && nameDb) {
          this.userNameDiv.nativeElement.textContent = nameDb +"  "+ surnameDb;
        }

      }
    });
  }
}
