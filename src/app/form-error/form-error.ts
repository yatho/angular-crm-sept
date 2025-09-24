import { Component, computed, input, Signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatError } from '@angular/material/input';

@Component({
  selector: 'crm-form-error',
  imports: [MatError],
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
})
export class FormError {
  public readonly field = input<AbstractControl>();

  public readonly errorMessages = input<{
    [key: string]: string;
  }>();

  protected readonly errors: Signal<string[]> = computed(() =>
    Object.keys(this.field()?.errors as object).map((key) => {
      const errorMessages = this.errorMessages();
      return errorMessages?.[key] ? errorMessages?.[key] : `Missing message for ${key}`;
    }),
  );

  protected isError(): boolean {
    const field = this.field();
    return !!field && field.touched && field.invalid;
  }
}
