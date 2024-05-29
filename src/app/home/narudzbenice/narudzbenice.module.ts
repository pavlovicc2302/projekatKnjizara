import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NarudzbenicePageRoutingModule } from './narudzbenice-routing.module';

import { NarudzbenicePage } from './narudzbenice.page';
import { NarudzbenicaElementComponent } from './narudzbenica-element/narudzbenica-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NarudzbenicePageRoutingModule
  ],
  declarations: [NarudzbenicePage, NarudzbenicaElementComponent]
})
export class NarudzbenicePageModule {}
