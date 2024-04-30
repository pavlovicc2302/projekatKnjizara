import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KnjigaModalComponent } from './home/knjiga-modal/knjiga-modal.component';
import { KnjigeService } from './home/knjige.service';
import { KnjigaModel } from './home/knjiga.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  knjige: KnjigaModel[];

  constructor(private knjigeServis: KnjigeService, private modalCtrl: ModalController) {
  this.knjige=this.knjigeServis.knjige;
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: KnjigaModalComponent
    });
    modal.present();
    const {data, role} = await modal.onWillDismiss();
    if (role === 'confirm'){
      console.log(data);
      this.knjigeServis.addKnjiga(data.knjigaData.naslov, data.knjigaData.autor, data.knjigaData.isbn,
         data.knjigaData.slika, data.knjigaData.opis, data.knjigaData.cena, data.knjigaData.kolicina,
          data.knjigaData.status, data.knjigaData.userId).subscribe((res)=>{ 
              console.log(res);
            }
          );
    }
  }
}
