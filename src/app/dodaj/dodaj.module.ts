import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DodajPageRoutingModule } from './dodaj-routing.module';

import { DodajPage } from './dodaj.page';
import { KnjigaModalComponent } from '../home/knjiga-modal/knjiga-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DodajPageRoutingModule
  ],
  declarations: [DodajPage, KnjigaModalComponent]
})
export class DodajPageModule {}
