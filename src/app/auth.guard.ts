import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }
  canActivate():boolean{
    if (this.authService.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this.router.navigate(['/loginuser'])
      return false
    }
  }
}
