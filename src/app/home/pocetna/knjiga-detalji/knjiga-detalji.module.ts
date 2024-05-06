import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnjigaDetaljiPageRoutingModule } from './knjiga-detalji-routing.module';

import { KnjigaDetaljiPage } from './knjiga-detalji.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnjigaDetaljiPageRoutingModule
  ],
  declarations: [KnjigaDetaljiPage]
})
export class KnjigaDetaljiPageModule {}
