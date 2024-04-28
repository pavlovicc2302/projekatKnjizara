import { Component, OnInit } from '@angular/core';
import { KnjigaModel } from './knjiga.model';
import { KnjigeService } from './knjige.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  knjige: KnjigaModel[];

  constructor(private knjigeService: KnjigeService) {
    this.knjige = this.knjigeService.knjige;
  }
  ngOnInit() {
    this.knjigeService.getKnjige().subscribe(
      (knjigeData: any)=>{
        
        this.knjige = knjigeData;
      }
    )
  }

  


}
