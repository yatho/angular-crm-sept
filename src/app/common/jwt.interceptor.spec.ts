import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import { jwtInterceptor } from './jwt.interceptor';
import { Authentication } from '../login/authentication';

describe('jwtInterceptor', () => {
  let httpMock: HttpTestingController;
  const authenticationService = {
    token: () => 'test-token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideHttpClientTesting(),
        { provide: Authentication, useValue: authenticationService }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    const http = TestBed.inject(HttpClient);
    http.get('/api/data').subscribe();

    const httpRequest = httpMock.expectOne('/api/data');

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer test-token');
  });
});
