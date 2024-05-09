import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  show:boolean = false;
  alertButtons = ['Ok'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    })

    this.disableAutoFill();
  }

  onRegister() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(
      resData => {
        console.log('Restracija uspela!');
        console.log(resData);
        this.router.navigateByUrl('/login')
      }
    )
  }

  togglePassword() {
    this.show = !this.show;
  }

  
  disableAutoFill() {
    const inputFields = document.querySelectorAll<HTMLInputElement>('ion-input');
  
    inputFields.forEach((input: HTMLInputElement) => {
      input.setAttribute('autocomplete', 'new-password');
    });
  }
  
}
