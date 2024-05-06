import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoruciPageRoutingModule } from './poruci-routing.module';

import { PoruciPage } from './poruci.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoruciPageRoutingModule
  ],
  declarations: [PoruciPage]
})
export class PoruciPageModule {}
