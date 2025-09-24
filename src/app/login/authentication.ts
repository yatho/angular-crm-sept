import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
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
  private currentUser: WritableSignal<User | undefined> = signal(undefined);
  private jwtToken: WritableSignal<string | undefined> = signal(undefined);
  private _authenticated: Signal<boolean> = computed(() => !!this.currentUser());
  private http = inject(HttpClient);

  constructor() {
    // Check user connected?
    if (sessionStorage.getItem(USER_STORAGE_KEY)) {
      this.currentUser.set(JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!));
      this.jwtToken.set(sessionStorage.getItem(TOKEN_STORAGE_KEY)!);
    }
  }

  get user() {
    return this.currentUser.asReadonly();
  }

  get authenticated() {
    return this._authenticated;
  }

  public get token(): Signal<string | undefined> {
    return this.jwtToken.asReadonly();
  }

  authentUser(login: string, password: string): Observable<User> {
    return this.http
      .post<AuthentResponse>(`/api/auth/login`, {
        email: login,
        password,
      })
      .pipe(
        map((result) => {
          this.currentUser.set(result.user);
          this.jwtToken.set(result.token);
          sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser()));
          sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this.jwtToken()));
          return this.currentUser()!;
        }),
      );
  }

  disconnect(): void {
    this.currentUser.set(undefined);
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
