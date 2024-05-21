import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { KnjigaModel, Status } from '../knjiga.model';
import { KnjigeService } from '../knjige.service';
import { Narudzbenica, StavkaNarudzbenice } from '../narudzbenica.model';

@Component({
  selector: 'app-poruci',
  templateUrl: './poruci.page.html',
  styleUrls: ['./poruci.page.scss'],
})
export class PoruciPage implements OnInit {
  knjige:  KnjigaModel[];

  narudzbenica: Narudzbenica = {
    id: '',
    userId: '',
    ukupnaKolicina: 0,
    ukupnaCena: 0,
    datum: new Date(),
    stavke: []
  };

  constructor(private knjigeService: KnjigeService, private modalCtrl: ModalController, private alertController: AlertController) { 
    //this.knjige = this.knjigeService.knjige;
  }

  ngOnInit() {
    this.knjigeService.knjige.subscribe((knjige)=>{
      this.knjige = knjige;
    })
  }

  ionViewWillEnter(){
    this.knjigeService.getKnjige(Status.Nema_na_lageru).subscribe(
      (knjigeData: any)=>{
          this.knjige = knjigeData;
      }
    )
  }

  

  async prikaziPopup() {
    const alert = await this.alertController.create({
      header: 'Vaša narudžbenica',
      subHeader: 'Knjige koje ste poručili:',
      message: this.formatirajNarudzbenicu(),
      buttons: [
        {
          text: 'Ne',
          role: 'cancel'
        },
        {
          text: 'Da',
          handler: () => {
            // Implementirajte logiku za čuvanje narudžbenice
            // Možete koristiti this.narudzbenica
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  formatirajNarudzbenicu() {
    let narudzbenicaText = '';
    this.narudzbenica.stavke.forEach(stavka => {
      narudzbenicaText += `${stavka.naslov} - ${stavka.kolicina} x ${stavka.cena} RSD\n`;
    });
    narudzbenicaText += `Ukupna cena: ${this.narudzbenica.ukupnaCena} RSD`;
    return narudzbenicaText;
  }
}
