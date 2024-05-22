import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NarudzbenicaService } from '../narudzbenica.service';
import { StavkaNarudzbenice } from '../narudzbenica.model';
import { forkJoin } from 'rxjs';
import { KnjigeService } from '../knjige.service';
import { Status } from '../knjiga.model';

@Component({
  selector: 'app-narudzbenica-modal',
  templateUrl: './narudzbenica-modal.component.html',
  styleUrls: ['./narudzbenica-modal.component.scss'],
})
export class NarudzbenicaModalComponent implements OnInit {
  nizStavki: StavkaNarudzbenice[] = [];

  
  constructor(
    private modalCtrl: ModalController,
    private narudzbenicaService: NarudzbenicaService,
    private knjigeService:KnjigeService
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

    const promeneStatusa = this.nizStavki.map(stavka =>
      this.knjigeService.promeniStatusKnjige(stavka.knjigaId, Status.Na_cekanju)
    );
  

    console.log(this.ukupnaCena())
    console.log(this.ukupnaKolicina())
    this.narudzbenicaService
      .addNarudzbenica(this.ukupnaKolicina(), this.ukupnaCena())
      .subscribe(() => {
        this.modalCtrl.dismiss({ confirm: true });
      }, (error) => {
        // Handle error
        console.error('Error while adding narudzbenica:', error);
      });

       // Koristi se forkJoin da se saceka da svi Observable-i završe
    forkJoin(promeneStatusa).subscribe({
      next: () => {
        // Kada su sve promene statusa završene, kreira se narudzbenica
        this.narudzbenicaService
          .addNarudzbenica(this.ukupnaKolicina(), this.ukupnaCena())
          .subscribe(() => {
            this.modalCtrl.dismiss({ confirm: true });
          }, (error) => {
            console.error('Error while adding narudzbenica:', error);
          });
      },
      error: (error) => {
        console.error('Error while updating book statuses:', error);
      }
    });
  }

  ukupnaCena(): number {
    return this.nizStavki.reduce((total, stavka) => total + stavka.cena * stavka.kolicina, 0);
  }

  ukupnaKolicina():number{
    return this.nizStavki.reduce((total, stavka)=> total + stavka.kolicina,0)
  }
}
