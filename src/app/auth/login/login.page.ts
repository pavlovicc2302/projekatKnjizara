import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogIn(logInForm: NgForm){
    console.log(logInForm);
    if(logInForm.valid){
      this.authService.logIn(logInForm.value).subscribe(
        (resData) => {
          console.log('Uspesan login')
          console.log(resData)
          this.router.navigateByUrl('/home')
        }
      );
      this.router.navigateByUrl('/home')
    }
  }
}
