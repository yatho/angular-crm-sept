import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private authenticationService: Authentication;
  private router: Router;
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.authenticationService = inject(Authentication);
    this.router = inject(Router);

    if (this.authenticationService.authenticated()) {
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
    this.authenticationService
      .authentUser(login, password)
      .pipe(
        catchError((err) => {
          this.snackBar.open('Authentification en erreur, merci de réessayer', undefined, {
            duration: 3000,
          });
          return [];
        }),
      )
      .subscribe((user) => this.router.navigateByUrl('/home'));
  }
}
