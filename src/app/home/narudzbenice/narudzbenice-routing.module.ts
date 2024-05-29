import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NarudzbenicePage } from './narudzbenice.page';

const routes: Routes = [
  {
    path: '',
    component: NarudzbenicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NarudzbenicePageRoutingModule {}
