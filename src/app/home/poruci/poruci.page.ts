import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KnjigaModel, Status } from '../knjiga.model';
import { KnjigeService } from '../knjige.service';

@Component({
  selector: 'app-poruci',
  templateUrl: './poruci.page.html',
  styleUrls: ['./poruci.page.scss'],
})
export class PoruciPage implements OnInit {
  knjige:  KnjigaModel[];

  constructor(private knjigeService: KnjigeService, private modalCtrl: ModalController) { 
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

}
