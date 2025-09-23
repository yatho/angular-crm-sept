import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormError } from '../form-error/form-error';
import { Authentication } from './authentication';
import { Router } from '@angular/router';

function checkPassword(c: AbstractControl): ValidationErrors | null {
  if (c.value.length < 5) {
    return {
      checkPassword: 'Error : password is less than 5 characters',
    };
  }
  return null;
}

@Component({
  selector: 'crm-login',
  imports: [ReactiveFormsModule, MatInput, MatLabel, MatFormField, MatButton, FormError],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authenticationService: Authentication;
  private router: Router;

  constructor() {
    this.authenticationService = inject(Authentication);
    this.router = inject(Router);

    if (this.authenticationService.authenticated) {
      this.authenticationService.disconnect();
    }
  }

  protected loginForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, checkPassword],
      nonNullable: true,
    }),
  });

  protected submit() {
    const { login, password } = this.loginForm.getRawValue();
    const user = this.authenticationService.authentUser(login, password);
    console.log(user, 'From service');
    this.router.navigateByUrl('/home');
  }
}
