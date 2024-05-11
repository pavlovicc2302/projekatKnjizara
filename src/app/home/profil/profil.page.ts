import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  ulogovani: any;

  constructor() { }

  ngOnInit() {
     this.ulogovani = localStorage.getItem("imeUlogovanog") + ' ' + localStorage.getItem("prezimeUlogovanog")
     console.log(this.ulogovani);
  }

}
