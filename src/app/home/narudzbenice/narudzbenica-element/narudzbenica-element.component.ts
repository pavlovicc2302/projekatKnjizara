import { Component, Input, OnInit } from '@angular/core';
import { Narudzbenica, StatusNarudzbenice, StavkaNarudzbenice } from '../../narudzbenica.model';
import { NarudzbenicaService } from '../../narudzbenica.service';

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

  constructor(private narudzbenicaService: NarudzbenicaService) {}

  ngOnInit(): void {
  
  }
}
