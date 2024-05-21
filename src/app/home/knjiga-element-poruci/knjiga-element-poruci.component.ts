import { Component, Input, OnInit } from '@angular/core';
import { KnjigaModel, Status } from '../knjiga.model';
import { Narudzbenica, StavkaNarudzbenice } from '../narudzbenica.model';

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
  kolicina: number = 0;
  dodata: boolean = false;
  narudzbenica: Narudzbenica = {
    id: '',
    userId: '',
    ukupnaKolicina: 0,
    ukupnaCena: 0,
    datum: new Date(),
    stavke: []
  };

  dodajUKorpu(knjiga: KnjigaModel) {
    console.log(this.kolicina)
    if (this.kolicina > 0) { // Proverimo da li je uneta validna vrednost
      const stavka: StavkaNarudzbenice = {
        id: '',
        knjigaId: knjiga.id,
        isbn: knjiga.isbn,
        naslov: knjiga.naslov,
        kolicina: this.kolicina,
        cena: knjiga.cena,
        iznos: this.kolicina * knjiga.cena
      };
      console.log(stavka)
      // Ako je narudžbenica prazna, kreirajte novu
      if (this.narudzbenica.stavke.length === 0) {
        this.narudzbenica = {
          id: '',
          userId: '',
          ukupnaKolicina: stavka.kolicina,
          ukupnaCena: stavka.iznos,
          datum: new Date(),
          stavke: [stavka]
        };
      } else {
        // Ako već postoji narudžbenica, dodajte novu stavku u postojeći niz stavki
        this.narudzbenica.stavke.push(stavka);
        this.narudzbenica.ukupnaKolicina += stavka.kolicina;
        this.narudzbenica.ukupnaCena += stavka.iznos;
      }
      
      console.log(this.narudzbenica)
      // Ne resetujte vrednost količine nakon dodavanja knjige
      // this.kolicina = 0;
  
      const divElement = document.getElementById(knjiga.id);
      if (divElement) { // Proverimo da li postoji element sa datim ID-om
        divElement.style.backgroundColor = 'yellow'; // Promena boje pozadine
      }
    }
  }
  
  
  
  constructor() { }

  ngOnInit() { }

}
