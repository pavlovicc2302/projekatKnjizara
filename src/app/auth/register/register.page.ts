import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  show: boolean = false;
  alertButtons = ['Ok'];
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   surname: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(7)])
    // })

    this.disableAutoFill();
  }

  onRegister(registerForm: NgForm) {
    console.log(registerForm);
    let errorMessage = '';
    var deoDoMankija = '';
    var unetiEmail = registerForm.value['email'];
    console.log(unetiEmail)
    for (var e of unetiEmail) {
      if (e !== '@') {
        deoDoMankija += e;
      } else {
        break;
      }
    }
    console.log(deoDoMankija)
    if (!deoDoMankija.includes('.')) {
      errorMessage = "Email mora biti u formatu ime.prezime@gmail.com"
      this.presentAlert('Greška', errorMessage)
      return;
    } else {
      if (registerForm.valid) {
        this.authService.register(registerForm.value).subscribe({
          next: (resData) => {
            console.log('Registracija uspešna');
            console.log(resData);

            this.router.navigateByUrl('/login');
          },
          error: (error) => {
            console.log('Neuspešna registracija!');
            console.log(error);
           
            if (error.error.error.message === 'EMAIL_EXISTS') {
              errorMessage =
                'Ovaj mejl je već registrovan! Pređite na stranicu za prijavu.';
            }
            this.presentAlert('Greška!', errorMessage);
          },
        });
      }
    }
  }

  togglePassword() {
    this.show = !this.show;
  }

  disableAutoFill() {
    const inputFields =
      document.querySelectorAll<HTMLInputElement>('ion-input');

    inputFields.forEach((input: HTMLInputElement) => {
      input.setAttribute('autocomplete', 'new-password');
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
