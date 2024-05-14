import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  ulogovani: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.ulogovani = localStorage.getItem("ulogovani")
  }

  logOut() {
    this.authService.logOut();
    localStorage.removeItem('ulogovani');
    this.router.navigateByUrl('/login');
  }

}
