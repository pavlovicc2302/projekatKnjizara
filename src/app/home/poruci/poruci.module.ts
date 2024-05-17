import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoruciPageRoutingModule } from './poruci-routing.module';

import { PoruciPage } from './poruci.page';
import { KnjigaElementPoruciComponent } from '../knjiga-element-poruci/knjiga-element-poruci.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoruciPageRoutingModule
  ],
  declarations: [PoruciPage, KnjigaElementPoruciComponent]
})
export class PoruciPageModule {}
