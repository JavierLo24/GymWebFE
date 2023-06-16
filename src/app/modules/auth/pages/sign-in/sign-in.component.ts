import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import swal from 'sweetalert2';
import * as jwtHelper from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  public dissabledLogin = false;

  public singinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private _router: Router,
    private jwlHelper: JwtService,
  ){}

  public login(){
    const email = `${this.singinForm.controls['email'].value}`;
    const password = `${this.singinForm.controls['password'].value}`;

    this.auth.login(email, password).subscribe({
      next: ( res: any) => {
        const role = this.jwlHelper.getRole();
        this._router.navigateByUrl(this.getNavigateUrl(role))
      },
      error: (err: unknown) => {
        this.dissabledLogin = false;
        swal.fire('¡Error!', 'Ha ocurrido un error', 'error');
      },
    })
  }

/**
   * Método para retornar la url de navegacion dado el rol.
   * @param role role del usuario
   * @returns la url a navegar
   */
public getNavigateUrl(role: string) {
  const urls: { [key: string]: string } = {
    CLIENTE: '',
    ADMIN: '/admin/home',
  };

  return urls[role];
}

}
