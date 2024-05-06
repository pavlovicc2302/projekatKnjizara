import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DodajPage } from './dodaj.page';

const routes: Routes = [
  {
    path: '',
    component: DodajPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DodajPageRoutingModule {}
