import { inject, Injectable } from '@angular/core';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const USER_STORAGE_KEY = 'angular-crm.user';
const TOKEN_STORAGE_KEY: string = 'angular-crm.token';

type AuthentResponse = {
  user: User;
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private currentUser?: User;
  private jwtToken?: string;
  private http = inject(HttpClient);

  constructor() {
    // Check user connected?
    if (sessionStorage.getItem(USER_STORAGE_KEY) !== null) {
      this.currentUser = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!);
      this.jwtToken = sessionStorage.getItem(TOKEN_STORAGE_KEY)!;
    }
  }

  get authenticated() {
    return !!this.currentUser;
  }

  public get token(): string | undefined {
    return this.jwtToken;
  }

  authentUser(login: string, password: string): Observable<User> {
    return this.http
      .post<AuthentResponse>(`/api/auth/login`, {
        email: login,
        password,
      })
      .pipe(
        map((result) => {
          this.currentUser = result.user;
          this.jwtToken = result.token;
          sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser));
          sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this.jwtToken));
          return this.currentUser;
        }),
      );
  }

  disconnect(): void {
    delete this.currentUser;
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
