import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { KnjigaModel, Status } from '../knjiga.model';
import { KnjigeService } from '../knjige.service';
import { Narudzbenica, StavkaNarudzbenice } from '../narudzbenica.model';
import { NarudzbenicaService } from '../narudzbenica.service';
import { NarudzbenicaModalComponent } from '../narudzbenica-modal/narudzbenica-modal.component';

@Component({
  selector: 'app-poruci',
  templateUrl: './poruci.page.html',
  styleUrls: ['./poruci.page.scss'],
})
export class PoruciPage implements OnInit {
  knjige:  KnjigaModel[];

  narudzbenice: Narudzbenica[];

  constructor(private knjigeService: KnjigeService, private narudzbenicaService: NarudzbenicaService, private modalCtrl: ModalController, private alertController: AlertController) { 
      this.narudzbenicaService.narudzbenice.subscribe(narudzbenice => {
        this.narudzbenice = narudzbenice;
      });
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
    const modal = await this.modalCtrl.create({
      component: NarudzbenicaModalComponent,
      // componentProps: { narudzbenica: this.narudzbenice } //NISAM SIG
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.confirm) {
        this.showConfirmation();
      }
    });

    await modal.present();
  }

  async showConfirmation() {
    const alert = await this.alertController.create({
      header: 'Uspešno ste naručili knjige!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
