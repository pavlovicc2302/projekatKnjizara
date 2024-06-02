import { Component, OnInit } from '@angular/core';
import { KnjigaModel, Komentar, Status } from '../../knjiga.model';
import { ActivatedRoute, Router } from '@angular/router';
import { KnjigeService } from '../../knjige.service';
import { switchMap, tap } from 'rxjs';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { KnjigaModalComponent } from '../../knjiga-modal/knjiga-modal.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-knjiga-detalji',
  templateUrl: './knjiga-detalji.page.html',
  styleUrls: ['./knjiga-detalji.page.scss'],
})
export class KnjigaDetaljiPage implements OnInit {
  Status = Status;
  komentar: string = '';
  komentari: Komentar[] = [];
  ulogovaniID: string = '';

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
    komentari: [],
  };

  constructor(
    private route: ActivatedRoute,
    private knjigeService: KnjigeService,
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.ulogovaniID = localStorage.getItem('ulogovaniID');
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const knjigaId = paramMap.get('knjigaId');
          return this.knjigeService.getKnjiga(knjigaId);
        })
      )
      .subscribe((knjiga) => {
        this.knjiga = knjiga;
        this.knjigeService.komentari.subscribe((komentari: any)=>{
          this.komentari = komentari;
        })
      });

    this.knjigeService.knjige.subscribe((knjige) => {
      const updatedKnjiga = knjige.find((k) => k.id === this.knjiga.id);
      if (updatedKnjiga) {
        this.knjiga = updatedKnjiga;
      }
    });
    
  }

  ionViewWillEnter(){
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const knjigaId = paramMap.get('knjigaId');
          return this.knjigeService.getKnjiga(knjigaId);
        })
      )
      .subscribe((knjiga) => {
        this.knjiga = knjiga;
        this.knjigeService.getKomentare(this.knjiga.id).subscribe(
          (komentariData: any)=>{
            console.log(komentariData);
            this.komentari = komentariData;
          }
        )
      });

    this.knjigeService.knjige.subscribe((knjige) => {
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
    this.knjigeService.promeniStatusKnjige(this.knjiga.id, status).subscribe(
      () => {
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
        this.knjigeService
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

  async addKomentar() {
    const userId = localStorage.getItem('ulogovaniID');
    let korisnik = localStorage.getItem('ulogovani');
    const displayNameParts = korisnik.split(' ');
    const ime = displayNameParts[0];

    const komentarData = {
      id: null,
      userId: userId,
      korisnik: ime,
      knjigaId: this.knjiga.id,
      komentar: this.komentar,
    };

    this.knjigeService.addKomentar(komentarData.userId, komentarData.korisnik, komentarData.knjigaId, komentarData.komentar).subscribe(
      () => {
        console.log('Komentar je uspešno sačuvan.');
        this.presentToast('Komentar je objavljen!', 'bottom');
        this.komentar = '';
        this.knjigeService.getKomentare(this.knjiga.id).subscribe(
        (komentariData: any) => {
          this.komentari = komentariData;
        }
      );
    },
      (error) => {
        console.error('Došlo je do greške prilikom čuvanja komentara:', error);
        this.presentToast('Greška pri objavljivanju komentara!', 'bottom');
      }
    );
  }

  deleteKomentar(id:string){
    this.knjigeService.deleteKomentar(id).subscribe(() => {
      this.komentari = this.komentari.filter(k => k.id !== id);
      this.presentToast('Komentar je izbrisan!','bottom')
    });
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }


  async generateCommentsPDF(komentar: Komentar) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Komentar', 10, 10);

    doc.setFontSize(12);
    doc.text(`Korisnik: ${komentar.korisnik}`, 10, 20);
    doc.text(`${komentar.komentar}`, 10, 25);

    doc.save(`komentar_${komentar.korisnik}.pdf`);
  }

}
