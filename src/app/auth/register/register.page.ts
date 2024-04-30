import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('radi')

    this.registerForm = new FormGroup({
      name: new FormGroup('', Validators.required),
      surname: new FormGroup('', Validators.required),
      email: new FormGroup('', [Validators.required, Validators.email]),
      password: new FormGroup('', [Validators.required, Validators.minLength(7)])
    })
  }

  onRegister(){
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(
      resData => {
        console.log('Registracija uspesna!')
        console.log(resData)
      }
    )
  }

}
