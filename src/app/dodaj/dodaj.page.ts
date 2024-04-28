import { Component, OnInit } from '@angular/core';
import { KnjigaModel } from '../home/knjiga.model';
import { KnjigeService } from '../home/knjige.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dodaj',
  templateUrl: './dodaj.page.html',
  styleUrls: ['./dodaj.page.scss'],
})
export class DodajPage implements OnInit {

  knjige: KnjigaModel[];

  constructor(private knjigeServis: KnjigeService, private modalCtrl: ModalController) {
    this.knjige = this.knjigeServis.knjige;
   }

  ngOnInit() {
  }

  async openModal(){
    // const modal = await this.modalCtrl.create();
  }
}
