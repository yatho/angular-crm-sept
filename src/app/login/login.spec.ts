import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

const getSubmitButton = (fixture: ComponentFixture<Login>) => {
  return fixture.nativeElement.querySelector('button[type="submit"]');
};
const getLoginField = (fixture: ComponentFixture<Login>) => {
  return fixture.nativeElement.querySelector('input[name="login"]');
};
const getPasswordField = (fixture: ComponentFixture<Login>) => {
  return fixture.nativeElement.querySelector('input[name="password"]');
};
const getLoginError = (fixture: ComponentFixture<Login>) => {
  return fixture.nativeElement.querySelector('[name="login"] + span.help-block');
};
const getPasswordError = (fixture: ComponentFixture<Login>) => {
  return fixture.nativeElement.querySelector('[name="password"] + span.help-block');
};

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filled the login and the password', () => {
    const loginField = getLoginField(fixture);
    const passwordField = getPasswordField(fixture);
    const button = getSubmitButton(fixture);
    const loginForm = component['loginForm'];

    // Initial state testing
    expect(button.disabled).toBeTruthy();
    expect(loginForm.value).toEqual({
      login: '',
      password: '',
    });
    expect(loginForm.invalid).toBeTruthy();

    // Update datas
    loginField.value = 'admin';
    passwordField.value = 'password';
    loginField.dispatchEvent(new Event('input'));
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Final state testing
    expect(loginForm.value).toEqual({
      login: 'admin',
      password: 'password',
    });
    expect(loginForm.valid).toBeTruthy();
    expect(loginForm.errors).toBeNull();
    expect(button.disabled).toBeFalsy();
  });

  it('should correctly display error', () => {
    const loginField = getLoginField(fixture);
    const passwordField = getPasswordField(fixture);
    const button = getSubmitButton(fixture);

    // Initial state testing
    expect(button.disabled).toBeTruthy();

    // Update datas
    loginField.value = 'ad';
    passwordField.value = 'pa';
    loginField.dispatchEvent(new Event('input'));
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Final state testing
    const loginError = getLoginError(fixture);
    const passwordError = getPasswordError(fixture);
    expect(loginError.textContent).toContain('The login must have a minimum of 3 characters.');
    expect(passwordError.textContent).toContain(
      'The password must have a minimum of 5 characters.',
    );
    expect(button.disabled).toBeTruthy();
  });
});
