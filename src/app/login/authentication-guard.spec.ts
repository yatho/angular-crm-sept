import { TestBed } from '@angular/core/testing';
import { CanActivateFn, UrlTree } from '@angular/router';

import { authenticationGuard } from './authentication-guard';
import { provideHttpClient } from '@angular/common/http';
import { Authentication } from './authentication';
import { vitest } from 'vitest';

describe('authenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authenticationGuard(...guardParameters));

  const authenticatedSpy = vitest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: Authentication,
          useValue: {
            authenticated: authenticatedSpy,
          },
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return false when no user logged in', () => {
    authenticatedSpy.mockReturnValue(false);
    const result = executeGuard({} as any, {} as any);
    expect((result as UrlTree).toString()).toContain('/login');
  });

  it('should return true when user logged in', () => {
    authenticatedSpy.mockReturnValue(true);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBe(true);
  });
});
