import { Component, OnInit } from '@angular/core';
import { KnjigaModel, Status } from '../knjiga.model';
import { ActivatedRoute } from '@angular/router';
import { KnjigeService } from '../knjige.service';

@Component({
  selector: 'app-knjiga-detalji',
  templateUrl: './knjiga-detalji.page.html',
  styleUrls: ['./knjiga-detalji.page.scss'],
})
export class KnjigaDetaljiPage implements OnInit {

  knjiga:  KnjigaModel = {id: "3",
  naslov: 'lupi',
  autor: 'Dzorz Orvel',
  isbn: '145446641122',
  slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
  opis: 'Sjajna knjiga kidaaa',
  cena: 1099,
  kolicina: 10,
  status: Status.Dostupno
};

  constructor(private route:ActivatedRoute, private knjigeServis:KnjigeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      this.knjigeServis.getKnjiga(paramMap.get('knjigaId')).subscribe(
        (knjiga)=>{
          this.knjiga=knjiga;
        }
      )
    })
  }

}
