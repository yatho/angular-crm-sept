import { TestBed } from '@angular/core/testing';

import { Authentication } from './authentication';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('Authentication', () => {
  let service: Authentication;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Authentication);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test check that there is no other request pending
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user value', () => {
    const login = 'login';
    const password = 'password';
    service.authentUser(login, password).subscribe((user) => {
      expect(JSON.stringify(user)).not.toContain(password);
      expect(JSON.stringify(user)).toContain(login);
    });

    // check that one and only one request has been made on the URL
    const req = httpTestingController.expectOne('/api/auth/login');

    // Check the HTTP verb.
    expect(req.request.method).toEqual('POST');

    // Resolve observable with mock data
    req.flush({
      user: {
        login: login,
      },
    });
  });
});
