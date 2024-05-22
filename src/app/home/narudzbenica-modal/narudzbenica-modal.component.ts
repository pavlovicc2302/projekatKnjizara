import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Narudzbenica, StavkaNarudzbenice } from '../narudzbenica.model';
import { NarudzbenicaService } from '../narudzbenica.service';

@Component({
  selector: 'app-narudzbenica-modal',
  templateUrl: './narudzbenica-modal.component.html',
  styleUrls: ['./narudzbenica-modal.component.scss'],
})
export class NarudzbenicaModalComponent implements OnInit{
  //@Input() narudzbenica: Narudzbenica;
  
  
  nizStavki: StavkaNarudzbenice[] = [];
  
  constructor(
    private modalCtrl: ModalController,
    private narudzbenicaService: NarudzbenicaService
  ) {}

  ngOnInit(): void {
    this.narudzbenicaService.stavke.subscribe((stavke) => {
      this.nizStavki = stavke;
      console.log(this.nizStavki);
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  potvrdiNarudzbenicu() {
    /*this.narudzbenicaService
      .addNarudzbenica(
        
        this.narudzbenica.ukupnaKolicina,
        this.narudzbenica.ukupnaCena,
      

      )
      .subscribe(() => {
        this.modalCtrl.dismiss({ confirm: true });
      });*/
      // DODATI NARUDZBU ALI PRVO SRACUNATI UKUPNU KOLICINU I UKUPNU CENU
  }
}
