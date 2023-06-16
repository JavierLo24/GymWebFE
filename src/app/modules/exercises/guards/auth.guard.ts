import { Injectable } from '@angular/core';
import {  CanActivate, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../../auth/services/jwt.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwt: JwtService,
    private auth: AuthService,
    private router : Router
  ){}
  
  canActivate(){

    if(! this.auth.hasActiveSession()){
      this.router.navigate(['/auth'])
      return false
    }

    const rol = this.jwt.getRole() ;
    
    if(rol !==  'ADMIN'){
      this.router.navigate(['/auth'])
      return false
    }

    return true;
  }
  
}
