import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PocetnaPageRoutingModule } from './pocetna-routing.module';

import { PocetnaPage } from './pocetna.page';
import { KnjigaElementComponent } from '../knjiga-element/knjiga-element.component';
import { KnjigaModalComponent } from '../knjiga-modal/knjiga-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocetnaPageRoutingModule
  ],
  declarations: [PocetnaPage, KnjigaElementComponent]
})
export class PocetnaPageModule {}
