import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmInfoPage } from './film-info.page';

const routes: Routes = [
  {
    path: '',
    component: FilmInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmInfoPageRoutingModule {}
