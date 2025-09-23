import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Dummy } from './dummy/dummy';

@Component({
  selector: 'crm-root',
  imports: [RouterOutlet, Login, MatToolbar, MatIconButton, MatIcon, Dummy],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Angular-crm');

  protected display(val: string) {
    console.log(val, 'from parents');
  }
}
