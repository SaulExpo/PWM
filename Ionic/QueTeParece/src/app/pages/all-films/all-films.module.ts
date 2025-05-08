import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllFilmsPageRoutingModule } from './all-films-routing.module';

import { AllFilmsPage } from './all-films.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllFilmsPageRoutingModule
  ],
  declarations: [AllFilmsPage]
})
export class AllFilmsPageModule {}
