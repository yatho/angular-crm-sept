import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { vitest } from 'vitest';
import { Fiche } from './fiche';
import { Consumers } from '../consumers';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';

const getCancelButton = (fixture: ComponentFixture<Fiche>) => {
  return fixture.nativeElement.querySelector('button[id="cancelButton"]');
};

const getSubmitButton = (fixture: ComponentFixture<Fiche>) => {
  return fixture.nativeElement.querySelector('button[id="validButton"]');
};

const getCivilityField = (fixture: ComponentFixture<Fiche>) => {
  return fixture.debugElement.query(By.css('mat-select[id="civility"]'));
};

const getCivilityOptions = (fixture: ComponentFixture<Fiche>) => {
  return fixture.debugElement.queryAll(By.css('mat-option'));
};

const getFirstNameField = (fixture: ComponentFixture<Fiche>) => {
  return fixture.nativeElement.querySelector('input[id="firstname"]');
};

const getLastNameField = (fixture: ComponentFixture<Fiche>) => {
  return fixture.nativeElement.querySelector('input[id="lastname"]');
};

const getEmailField = (fixture: ComponentFixture<Fiche>) => {
  return fixture.nativeElement.querySelector('input[id="email"]');
};

const getPhoneField = (fixture: ComponentFixture<Fiche>) => {
  return fixture.nativeElement.querySelector('input[id="phone"]');
};

describe('Fiche Create', () => {
  let component: Fiche;
  let fixture: ComponentFixture<Fiche>;

  let createConsumerSpy = vitest.fn(() => EMPTY);
  let updateConsumerSpy = vitest.fn(() => EMPTY);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fiche],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: Consumers,
          useValue: {
            create: createConsumerSpy,
            update: updateConsumerSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Fiche);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should location back on cancel', () => {
    const button = getCancelButton(fixture);
    const back = vitest.fn();
    component['location'].back = back;
    button.click();
    expect(back).toHaveBeenCalled();
  });

  it('should called create on submit after form filling', () => {
    const civilityField = getCivilityField(fixture);
    const firstNameField = getFirstNameField(fixture);
    const lastNameField = getLastNameField(fixture);
    const emailField = getEmailField(fixture);
    const phoneField = getPhoneField(fixture);
    const submitButton = getSubmitButton(fixture);
    const consumerForm = component['consumerForm'];

    // Initial state testing
    expect(submitButton.disabled).toBeTruthy();
    expect(consumerForm.getRawValue()).toEqual({
      id: 0,
      civility: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
    });
    expect(consumerForm.invalid).toBeTruthy();

    // Update datas
    civilityField.componentInstance.open();
    const civilityOptions = getCivilityOptions(fixture);
    civilityOptions[0].nativeElement.click();
    firstNameField.value = 'John';
    lastNameField.value = 'Doe';
    emailField.value = 'john@doe.test';
    phoneField.value = '0123456789';
    firstNameField.dispatchEvent(new Event('input'));
    lastNameField.dispatchEvent(new Event('input'));
    emailField.dispatchEvent(new Event('input'));
    phoneField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Final state testing
    expect(consumerForm.getRawValue()).toEqual({
      id: 0,
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@doe.test',
      phone: '0123456789',
    });
    expect(consumerForm.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();

    submitButton.click();

    expect(updateConsumerSpy).not.toHaveBeenCalled();
    expect(createConsumerSpy).toHaveBeenCalled();
  });
});

describe('Fiche Update', () => {
  let component: Fiche;
  let fixture: ComponentFixture<Fiche>;

  let createConsumerSpy = vitest.fn(() => EMPTY);
  let updateConsumerSpy = vitest.fn(() => EMPTY);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fiche],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: Consumers,
          useValue: {
            create: createConsumerSpy,
            update: updateConsumerSpy,
            getById: () => {
              return of({
                id: 42,
                civility: 'Mr',
                firstname: 'John',
                lastname: 'Doe',
                email: 'john@doe.test',
                phone: '0123456789',
              });
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Fiche);
    fixture.componentRef.setInput('id', 42);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should location back on cancel', () => {
    const button = getCancelButton(fixture);
    const back = vitest.fn();
    component['location'].back = back;
    button.click();
    expect(back).toHaveBeenCalled();
  });

  it('should called update on submit after form filling', () => {
    const civilityField = getCivilityField(fixture);
    const firstNameField = getFirstNameField(fixture);
    const emailField = getEmailField(fixture);
    const submitButton = getSubmitButton(fixture);
    const consumerForm = component['consumerForm'];

    // Initial state testing
    expect(submitButton.disabled).toBeFalsy();
    expect(consumerForm.getRawValue()).toEqual({
      id: 42,
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@doe.test',
      phone: '0123456789',
    });
    expect(consumerForm.invalid).toBeFalsy();

    fixture.detectChanges();

    // Update datas
    civilityField.componentInstance.open();
    const civilityOptions = getCivilityOptions(fixture);
    civilityOptions[1].nativeElement.click();
    firstNameField.value = 'Jane';
    emailField.value = 'jane@doe.test';
    firstNameField.dispatchEvent(new Event('input'));
    emailField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Final state testing
    expect(consumerForm.getRawValue()).toEqual({
      id: 42,
      civility: 'Mme',
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane@doe.test',
      phone: '0123456789',
    });
    expect(consumerForm.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();

    submitButton.click();

    expect(updateConsumerSpy).toHaveBeenCalled();
    expect(createConsumerSpy).not.toHaveBeenCalled();
  });
});
