import { Injectable, inject } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanLoad {

//   constructor(private authService: AuthService, private router: Router){}

//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//       if(!this.authService.isUserAuthenticated){
//         this.router.navigateByUrl('/login')
//       }
//     return this.authService.isUserAuthenticated;
//   }
// }

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isUserAuthenticated){
    router.navigateByUrl('/login');
  }

  return authService.isUserAuthenticated;
}
