import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authentication } from '../login/authentication';

export const jWTInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Authentication).token;
  const clone = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(clone);
};
