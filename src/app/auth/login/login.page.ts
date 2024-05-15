import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }
  alertButtons = ['Ok'];

  show:boolean = false;

  isLoading: boolean = false;

  ngOnInit() {
  }

  onLogIn(logInForm: NgForm){
    console.log(logInForm)
    if (logInForm.valid) {
      this.isLoading = true;
      this.authService.logIn(logInForm.value).subscribe({
        next: (resData) => {
          console.log('Prijava uspesna!');
          console.log(resData);

          localStorage.setItem("ulogovani",resData.displayName);
          localStorage.setItem("ulogovaniID",resData.localId);
          this.isLoading = false;
          this.router.navigateByUrl('/home/tabs/pocetna');
        },
        error: (error) => {
          console.log('Neuspešna prijava!');
          console.log(error);
          let errorMessage = '';
          if (error.error.error.message === 'INVALID_LOGIN_CREDENTIALS') {
            errorMessage = 'Netačni kredencijali. Proverite email adresu i lozinku!';
          }
          this.isLoading = false;
          this.presentAlert('Greška!', errorMessage);
        }
      });
    }
    
  }
  togglePassword() {
    this.show = !this.show;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
}