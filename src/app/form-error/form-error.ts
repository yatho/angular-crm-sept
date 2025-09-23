import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatError } from '@angular/material/input';

@Component({
  selector: 'crm-form-error',
  imports: [MatError],
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
})
export class FormError {
  @Input()
  field?: AbstractControl;

  @Input()
  errorMessages?: { [key: string]: string };

  isError(): boolean {
    return !!this.field && this.field.touched && this.field.invalid;
  }

  get errors(): string[] {
    return Object.keys(this.field?.errors as object).map((key) => {
      return this.errorMessages?.[key] ? this.errorMessages?.[key] : `Missing message for ${key}`;
    });
  }
}
