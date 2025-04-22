import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth, db} from "../services/firebase-config";
import {doc, getDoc, setDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-films',
  imports: [RouterLink],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})

export class FilmsComponent implements OnInit {
  @ViewChild('userNameDiv', { static: false }) userNameDiv!: ElementRef;

  ngOnInit() {
    this.initializeOnAuthStateChanged();
  }

  private initializeOnAuthStateChanged() {
    onAuthStateChanged(auth, async(user: User|null)=>{
        const docRef = doc(db, `films/ph9z20bu0a5anne2j7je23hq`);
        const document = await getDoc(docRef);
        const userData = document.data();  // Obtener los datos del documento
        let nameDb = userData?.['Category'];
        let surnameDb = userData?.['Title'];

        if (this.userNameDiv && nameDb) {
          this.userNameDiv.nativeElement.textContent = nameDb +"  "+ surnameDb;
        }
    });
  }
}
