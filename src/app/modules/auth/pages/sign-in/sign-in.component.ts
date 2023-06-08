import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  public singinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor( 
    private fb: FormBuilder,
    private auth: AuthService
  ){}

  public login(){
    const email = `${this.singinForm.controls['email'].value}`;
    const password = `${this.singinForm.controls['password'].value}`;

    this.auth.login(email, password).subscribe({
      next: res =>{
        console.log(res)
      }
    })
  }
}
