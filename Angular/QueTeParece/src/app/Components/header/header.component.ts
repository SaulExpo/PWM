import { Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {auth} from '../../services/firebase-config';
import {NgIf} from "@angular/common";
import {onAuthStateChanged} from "@angular/fire/auth";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    userLogged: boolean = false; //Mirar el html *ngIf, esto comprueba y pone o no la etiqueta del perfil :)

    //ngOnInit es un mét0do en Angular que se ejecuta cuando el componente se inicializa, antes de que se muestre la vista.
    ngOnInit() {
        // Suscripción al estado de autenticación
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.userLogged = true;  // Usuario autenticado
            } else {
                this.userLogged = false; // No hay usuario autenticado
            }
        });
    }
}
