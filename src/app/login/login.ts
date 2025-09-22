import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

function checkPassword(c: AbstractControl): ValidationErrors | null {
  if (c.value.length < 5) {
    return {
      checkPassword: 'Error : password is less than 5 characters'
    };
  }
  return null;
}

@Component({
  selector: 'crm-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  protected loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', {
      validators: [
        Validators.required,
        checkPassword
      ]
    })
  });

  protected submit() {
    console.log(this.loginForm.controls.password.errors);
  }
}
