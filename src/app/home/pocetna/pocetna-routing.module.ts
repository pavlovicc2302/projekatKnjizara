import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PocetnaPage } from './pocetna.page';

const routes: Routes = [
  {
    path: '',
    component: PocetnaPage
  },
  {
    path: ':knjigaId',
    loadChildren: () => import('./knjiga-detalji/knjiga-detalji.module').then( m => m.KnjigaDetaljiPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PocetnaPageRoutingModule {}
