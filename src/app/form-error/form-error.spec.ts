import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormError } from './form-error';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

function getFieldError(fixture: ComponentFixture<Test>) {
  return fixture.nativeElement.querySelector('crm-form-error');
}
@Component({
  selector: 'test',
  template: `<crm-form-error
    [field]="control"
    [errorMessages]="{
      minlength: 'Minimum',
    }"
  />`,
  imports: [FormError],
})
class Test {
  control = new FormControl<string>('', [Validators.required, Validators.minLength(4)]);
}

describe('FormError', () => {
  let component: Test;
  let fixture: ComponentFixture<Test>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Test],
    }).compileComponents();

    fixture = TestBed.createComponent(Test);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify without interaction nothing is displayed', () => {
    const fieldError = getFieldError(fixture);
    expect(fieldError.textContent).toBe('');
  });

  it('should verify required error is displayed after touched form', () => {
    component.control.markAsTouched();
    fixture.detectChanges();
    const fieldError = getFieldError(fixture);
    expect(fieldError.textContent).toContain('Missing message for required');
  });

  it('should verify required error is displayed after touched form', () => {
    component.control.setValue('te');
    component.control.markAsTouched();
    fixture.detectChanges();
    const fieldError = getFieldError(fixture);
    expect(fieldError.textContent).toContain('Minimum');
  });
});
