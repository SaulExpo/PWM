import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmInfoPageRoutingModule } from './film-info-routing.module';

import { FilmInfoPage } from './film-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmInfoPageRoutingModule
  ],
  declarations: [FilmInfoPage]
})
export class FilmInfoPageModule {}
