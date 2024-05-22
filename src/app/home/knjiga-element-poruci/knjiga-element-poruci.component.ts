import { Component, Input, OnInit } from '@angular/core';
import { KnjigaModel, Status } from '../knjiga.model';
import { Narudzbenica, StavkaNarudzbenice } from '../narudzbenica.model';
import { NarudzbenicaService } from '../narudzbenica.service';

@Component({
  selector: 'app-knjiga-element-poruci',
  templateUrl: './knjiga-element-poruci.component.html',
  styleUrls: ['./knjiga-element-poruci.component.scss'],
})
export class KnjigaElementPoruciComponent implements OnInit {

  @Input() knjiga: KnjigaModel = {
    id: "3",
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
  kolicina: number;
  
  constructor(private narudzbenicaService: NarudzbenicaService) { }

  ngOnInit() { }

  promeniBoju: boolean = false;
  brojac: number = 0;

  dodajUKorpu() {
    console.log(this.kolicina)
    if (this.kolicina > 0) {
      this.promeniBoju = true;  // Toggle promenu boje

      const stavka: StavkaNarudzbenice = {
        id: '',
        knjigaId: this.knjiga.id,
        isbn: this.knjiga.isbn,
        naslov: this.knjiga.naslov,
        kolicina: this.kolicina,
        cena: this.knjiga.cena,
        iznos: this.kolicina * this.knjiga.cena
      };
      console.log(stavka)
      this.narudzbenicaService.dodajStavku(stavka);
      
    }
    this.brojac++;
  }

}
