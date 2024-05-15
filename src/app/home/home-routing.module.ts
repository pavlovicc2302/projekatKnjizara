import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'pocetna',
        loadChildren: () => import('./pocetna/pocetna.module').then( m => m.PocetnaPageModule)
      },
      {
        path: 'poruci',
        loadChildren: () => import('./poruci/poruci.module').then( m => m.PoruciPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/home/tabs/pocetna',
        pathMatch: 'full'
      }
    ],
  },

  {
    path: '',
    redirectTo: '/home/tabs/pocetna',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
