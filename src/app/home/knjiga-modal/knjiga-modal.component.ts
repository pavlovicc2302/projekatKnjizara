import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-knjiga-modal',
  templateUrl: './knjiga-modal.component.html',
  styleUrls: ['./knjiga-modal.component.scss'],
})
export class KnjigaModalComponent implements OnInit {

  @ViewChild('f', {static: true}) form: NgForm;
  @Input() title = 'Dodavanje knjige';
  @Input() knjiga: any;
  @Input() titleButton = 'Dodaj';

  autor: string;
  naslov: string;
  isbn: string;
  slika: string;
  opis: string;
  cena: number;
  kolicina: number;
  status: string;

  constructor(private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {
    if (this.knjiga) {
      this.autor = this.knjiga.autor;
      this.naslov = this.knjiga.naslov;
      this.isbn = this.knjiga.isbn;
      this.slika = this.knjiga.slika;
      this.opis = this.knjiga.opis;
      this.cena = this.knjiga.cena;
      this.kolicina = this.knjiga.kolicina;
      this.status = this.knjiga.status;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddKnjiga() {
    this.modalCtrl.dismiss(
      {
        knjigaData: {
          autor: this.form.value['autor'],
          naslov: this.form.value['naslov'],
          isbn: this.form.value['isbn'],
          slika: this.form.value['slika'],
          opis: this.form.value['opis'],
          cena: this.form.value['cena'],
          kolicina: this.form.value['kolicina'],
          status: this.form.value['status'],
        }
      },
      'confirm'
    );
  }
}
