import { Component, Input, OnInit } from '@angular/core';
import { KnjigaModel } from '../knjiga.model';

@Component({
  selector: 'app-knjiga-element',
  templateUrl: './knjiga-element.component.html',
  styleUrls: ['./knjiga-element.component.scss'],
})
export class KnjigaElementComponent  implements OnInit {

  @Input() knjiga: KnjigaModel = {id: 3,
    naslov: 'lupi',
    autor: 'Dzorz Orvel',
    isbn: 145446641122,
    slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
    opis: 'Sjajna knjiga kidaaa',
    cena: 1099,
    kolicina: 10};

  constructor() { }

  ngOnInit() {}

}
