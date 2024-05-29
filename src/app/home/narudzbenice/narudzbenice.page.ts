import { Component, OnInit } from '@angular/core';
import { NarudzbenicaService } from '../narudzbenica.service';
import { Narudzbenica, StatusNarudzbenice } from '../narudzbenica.model';

@Component({
  selector: 'app-narudzbenice',
  templateUrl: './narudzbenice.page.html',
  styleUrls: ['./narudzbenice.page.scss'],
})
export class NarudzbenicePage implements OnInit {

  narudzbenice: Narudzbenica[];

  constructor(private narudzbeniceService: NarudzbenicaService) { }

  ngOnInit() {
    this.narudzbeniceService.narudzbenice.subscribe((narudzbenice)=>{
      this.narudzbenice = narudzbenice;
    })
  }

  ionViewWillEnter(){
    this.narudzbeniceService.getNarudzbenice(StatusNarudzbenice.Neobradjena).subscribe(
      (narudzbeniceData: any)=>{
          this.narudzbenice = narudzbeniceData;
      }
    )
  }

}
