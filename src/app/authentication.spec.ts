import { TestBed } from '@angular/core/testing';

import { Authentication } from './authentication';

describe('Authentication', () => {
  let service: Authentication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authentication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user value', () => {
    const login = 'login';
    const password = 'password';
    const user = service.authentUser(login, password);
    expect(JSON.stringify(user)).not.toContain(password);
    expect(JSON.stringify(user)).toContain(login);
  });
});
