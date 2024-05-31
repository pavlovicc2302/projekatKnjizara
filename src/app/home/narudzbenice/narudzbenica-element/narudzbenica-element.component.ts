import { Component, Input, OnInit } from '@angular/core';
import {
  Narudzbenica,
  StatusNarudzbenice,
  StavkaNarudzbenice,
} from '../../narudzbenica.model';
import { NarudzbenicaService } from '../../narudzbenica.service';
import { KnjigeService } from '../../knjige.service';
import { Status } from '../../knjiga.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs';

@Component({
  selector: 'app-narudzbenica-element',
  templateUrl: './narudzbenica-element.component.html',
  styleUrls: ['./narudzbenica-element.component.scss'],
})
export class NarudzbenicaElementComponent implements OnInit {
  @Input() narudzbenica: Narudzbenica = {
    id: '3',
    user: 'user1',
    ukupnaKolicina: 0,
    ukupnaCena: 0,
    datum: '29.05.2024 12:01',
    stavke: [],
    status: StatusNarudzbenice.Neobradjena,
  };

  get StatusNarudzbenice() {
    return StatusNarudzbenice;
  }

  constructor(
    private narudzbenicaService: NarudzbenicaService,
    private knjigeService: KnjigeService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {}

  onStiglo() {
    this.narudzbenica.stavke.forEach((stavka) => {
      this.knjigeService
        .updateKnjiga(stavka.knjigaId, {
          kolicina: stavka.kolicina,
          status: Status.Dostupno,
        })
        .subscribe();
    });

    this.narudzbenicaService
      .updateNarudzbenicaStatus(
        this.narudzbenica.id,
        StatusNarudzbenice.Obradjena
      )
      .pipe(
        tap(() => {
          this.router.navigate(['/home/tabs/pocetna']);
          this.presentAlert('Narudžbenica je uspešno obrađena!');
        })
      )
      .subscribe();
  }

  async presentAlert(header: string) {
    const alert = await this.alertController.create({
      header: header,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
