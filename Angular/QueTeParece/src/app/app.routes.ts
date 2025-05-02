import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {NotificationsComponent} from "./Pages/notifications/notifications.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {FilmsComponent} from "./films/films.component";
import {FilmInfoComponent} from "./film-info/film-info.component";
import {EditReviewsComponent} from "./edit-reviews/edit-reviews.component";

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
