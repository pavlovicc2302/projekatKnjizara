import { Component, OnInit } from '@angular/core';
import { KnjigaModel, Status } from '../../knjiga.model';
import { ActivatedRoute, Router } from '@angular/router';
import { KnjigeService } from '../../knjige.service';
import { switchMap, tap } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { KnjigaModalComponent } from '../../knjiga-modal/knjiga-modal.component';

@Component({
  selector: 'app-knjiga-detalji',
  templateUrl: './knjiga-detalji.page.html',
  styleUrls: ['./knjiga-detalji.page.scss'],
})
export class KnjigaDetaljiPage implements OnInit {
  Status = Status;

  knjiga: KnjigaModel = {
    id: '3',
    naslov: 'lupi',
    autor: 'Dzorz Orvel',
    isbn: '145446641122',
    slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
    opis: 'Sjajna knjiga kidaaa',
    cena: 1099,
    kolicina: 10,
    status: Status.Dostupno,
    // userId: '1'
  };

  constructor(
    private route: ActivatedRoute,
    private knjigaService: KnjigeService,
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const knjigaId = paramMap.get('knjigaId');
          return this.knjigaService.getKnjiga(knjigaId);
        })
      )
      .subscribe((knjiga) => {
        this.knjiga = knjiga;
      });

    this.knjigaService.knjige.subscribe((knjige) => {
      const updatedKnjiga = knjige.find((k) => k.id === this.knjiga.id);
      if (updatedKnjiga) {
        this.knjiga = updatedKnjiga;
      }
    });
  }

  async presentAlert(header: string) {
    const alert = await this.alertController.create({
      header: header,
      buttons: ['OK'],
    });
    await alert.present();
  }

  promeniStatusKnjige(status: Status) {
    this.knjigaService.promeniStatusKnjige(this.knjiga.id, status).subscribe(
      () => {
        console.log('Knjiga je arhivirana.');
        this.router.navigateByUrl('/home/tabs/pocetna');
        this.presentAlert('Knjiga je arhivirana!');
      },
      (error) => {
        console.error('Došlo je do greške prilikom arhiviranja knjige:', error);
        this.presentAlert('Greška pri arhiviranju knjige!');
      }
    );
  }

  async onEditKnjiga() {
    const modal = await this.modalCtrl.create({
      component: KnjigaModalComponent,
      componentProps: {
        title: 'Izmeni knjigu',
        knjiga: this.knjiga,
        titleButton: 'Izmeni',
      },
    });

    modal.onDidDismiss().then((resultData) => {
      if (resultData.role === 'confirm') {
        const updatedKnjiga = resultData.data.knjigaData;
        this.knjigaService
          .updateKnjiga(this.knjiga.id, updatedKnjiga)
          .subscribe(
            () => {
              this.knjiga = { ...this.knjiga, ...updatedKnjiga };
              this.presentAlert('Knjiga je uspešno ažurirana!');
            },
            (err) => {
              this.presentAlert('Greška pri ažuriranju knjige!');
              console.log('Error updating book: ', err);
            }
          );
      }
    });
    return await modal.present();
  }
}
