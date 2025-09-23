import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Authentication } from './login/authentication';

@Component({
  selector: 'crm-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatTooltip,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Angular-crm');
  protected authent = inject(Authentication);
  private router = inject(Router);

  protected display(val: string) {
    console.log(val, 'from parents');
  }

  protected disconnect() {
    this.authent.disconnect();
    this.router.navigateByUrl('/login');
  }
}
