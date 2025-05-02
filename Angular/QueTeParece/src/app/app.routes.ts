import {Routes} from '@angular/router';
import {HomeComponent} from "./Pages/home/home.component";
import {ProfileComponent} from "./Pages/profile/profile.component";
import {EditProfileComponent} from "./Pages/edit-profile/edit-profile.component";
import {LoginComponent} from "./Pages/login/login.component";
import {NotificationsComponent} from "./Pages/notifications/notifications.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {AboutUsComponent} from "./Pages/about-us/about-us.component";
import {FilmsComponent} from "./Pages/films/films.component";
import {FilmInfoComponent} from "./Pages/film-info/film-info.component";
import {EditReviewsComponent} from "./Pages/edit-reviews/edit-reviews.component";


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'editProfile', component: EditProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'films', component: FilmsComponent },
    { path: 'filmInfo', component: FilmInfoComponent},
    { path: 'editReviews', component: EditReviewsComponent },
];
