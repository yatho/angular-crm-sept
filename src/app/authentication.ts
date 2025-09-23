import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  authentUser(login: string, password: string): any {
    return {
      userId: 1,
      login: login,
      lastname: 'Doe',
      firstname: 'John',
    };
  }
}
