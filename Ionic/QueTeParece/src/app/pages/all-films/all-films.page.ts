import {Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { DatabaseService } from '../../services/dataBase';
import {auth, db} from '../../services/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import {collection, getDocs} from "@angular/fire/firestore";
import {FooterComponent} from "../../components/footer/footer.component";
import {NavigationComponent} from "../../components/navigation/navigation.component";
import {HeaderComponent} from "../../components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {NgFor, NgIf} from "@angular/common";
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-all-films',
  templateUrl: './all-films.page.html',
  styleUrls: ['./all-films.page.scss'],
  imports: [
    RouterLink,
    FooterComponent,
    NavigationComponent,
    HeaderComponent,
    IonicModule,
    NgFor,
    NgIf
  ]
})
export class AllFilmsPage implements OnInit {
  @ViewChildren('buttonRef') buttonsRef!: QueryList<any>;
  isWeb: boolean = false;

  categoryType: string | null = null;
  films: { Category: string; Title: string; CoverUrl: string; type: string; Id: string;esFavorito?: boolean; }[] = [];
  AnimationFilms: { Category: string; Title: string; CoverUrl: string; type: string; Id: string;esFavorito?: boolean; }[] = [];
  LiveFilms: { Category: string; Title: string; CoverUrl: string; type: string; Id: string;esFavorito?: boolean; }[] = [];
  favoritosIds: string[] = [];
  userId: string | null = null;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.isWeb = Capacitor.getPlatform() === 'web';
    this.route.queryParams.subscribe((params) => {
      this.categoryType = params['name'];
      this.initializeOnAuthStateChanged();
    });
  }
  prepararRotacion() {
    this.buttonsRef.forEach((button: any, index: number) => {
      this.renderer.listen(button.nativeElement, 'click', () => {
        const container = button.nativeElement.parentElement.parentElement.firstElementChild;
        const firstImage = container.firstElementChild;
        container.appendChild(firstImage);
      });
    });
  }

  // Verificar si el usuario está autenticado y obtener sus favoritos
  initializeOnAuthStateChanged() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userId = user.uid; // Asociamos el usuario autenticado
        await this.loadFilms();
      } else {
        // Si el usuario no está logueado, redirigir al login
        this.router.navigateByUrl(`/login`, { replaceUrl: true });
      }
    });
  }

  // Cargar las películas y los favoritos de un usuario específico
  async loadFilms() {
    try {
      // Obtener los favoritos del usuario actual
      if (this.userId) {
        this.favoritosIds = await this.databaseService.getFavoritos(this.userId);
        console.log(this.favoritosIds)
      }

      // Cargar las películas de Firestore
      const docRef = collection(db, 'films');
      const collections = await getDocs(docRef);

      this.films = [];
      collections.forEach((document) => {
        const documentData = document.data();
        let categoryDb = documentData?.['Category'];
        let titleDb = documentData?.['Title'];
        let coverDb = documentData?.['CoverUrl'];
        let typeDb = documentData?.['type'];
        let filmIdDb = document.id;

        if (categoryDb && titleDb && coverDb) {
          this.films.push({
            Category: categoryDb,
            Title: titleDb,
            CoverUrl: coverDb,
            type: typeDb,
            Id: filmIdDb,
          });
        }
      });

      if (this.categoryType) {
        this.films = this.films.filter((film) => film.type === this.categoryType);
      }

      // Marcar si la película es favorita para el usuario
      this.films = this.films.map((film) => ({
        ...film,
        esFavorito: this.favoritosIds.includes(film.Id),
      }));

      // Filtrar por categorías
      this.AnimationFilms = this.films.filter((film) => film.Category === 'Animation');
      this.LiveFilms = this.films.filter((film) => film.Category === 'Live-Action');
      setTimeout(() => {
        this.prepararRotacion();
      });
    } catch (error) {
      console.error('Error al obtener las películas: ', error);
    }
  }

  // Cambiar el estado de favorito de una película para un usuario
  async toggleFavorito(filmId: string) {
    console.log(filmId)
    console.log(this.favoritosIds)
    if (!this.userId) return;

    if (this.favoritosIds.includes(filmId)) {
      await this.databaseService.eliminarFavorito(this.userId, filmId);
      this.favoritosIds = this.favoritosIds.filter((id) => id !== filmId);
    } else {
      await this.databaseService.agregarFavorito(this.userId, filmId);
      this.favoritosIds.push(filmId);
    }

    // Actualizar el estado de la película
    this.films = this.films.map((film) => ({
      ...film,
          esFavorito: this.favoritosIds.includes(film.Id),
    }));
    this.AnimationFilms = this.AnimationFilms.map((film) => ({
      ...film,
      esFavorito: this.favoritosIds.includes(film.Id),
    }));
    this.LiveFilms = this.LiveFilms.map((film) => ({
      ...film,
      esFavorito: this.favoritosIds.includes(film.Id),
    }));
  }

  filmRedirect(Id: string) {
    this.router.navigateByUrl(`/filmInfo?id=${Id}`, { replaceUrl: true });
  }
}
