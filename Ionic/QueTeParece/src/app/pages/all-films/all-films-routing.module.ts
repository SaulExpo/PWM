import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllFilmsPage } from './all-films.page';

const routes: Routes = [
  {
    path: '',
    component: AllFilmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllFilmsPageRoutingModule {}
