import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-knjiga-modal',
  templateUrl: './knjiga-modal.component.html',
  styleUrls: ['./knjiga-modal.component.scss'],
})
export class KnjigaModalComponent  implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  title = 'Dodavanje knjige'
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss();
  }
  onAddKnjiga(){
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
        status: this.form.value['status']
        }
      },
      'confirm'
    );
  }
}
