import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnjigaDetaljiPage } from './knjiga-detalji.page';

const routes: Routes = [
  {
    path: '',
    component: KnjigaDetaljiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnjigaDetaljiPageRoutingModule {}
