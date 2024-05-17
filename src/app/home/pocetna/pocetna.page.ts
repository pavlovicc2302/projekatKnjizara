import { Component, OnInit } from '@angular/core';
import { KnjigaModel, Status } from '../knjiga.model';
import { KnjigeService } from '../knjige.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { KnjigaModalComponent } from '../knjiga-modal/knjiga-modal.component';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.page.html',
  styleUrls: ['./pocetna.page.scss'],
})
export class PocetnaPage implements OnInit {

  knjige:  KnjigaModel[];

  isLoading: boolean = false;

  constructor(private knjigeService: KnjigeService, private modalCtrl: ModalController, private loadingCtrl: LoadingController) { 
    //this.knjige = this.knjigeService.knjige;
  }

  ngOnInit() {
    this.knjigeService.knjige.subscribe((knjige)=>{
      this.knjige = knjige;
    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.knjigeService.getKnjige(Status.Dostupno).subscribe(
      (knjigeData: any)=>{
          this.knjige = knjigeData;
          this.isLoading = false;
      }
    )
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: KnjigaModalComponent,
    });
    modal.present();
    const {data, role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      console.log(data);

      this.knjigeService.addKnjiga(data.knjigaData.naslov, data.knjigaData.autor, data.knjigaData.isbn,
        data.knjigaData.slika, data.knjigaData.opis, data.knjigaData.cena, data.knjigaData.kolicina,
         data.knjigaData.status, //data.knjigaData.userId
        ).subscribe((res)=> {
          console.log(res);
        });
    }
  }
}
