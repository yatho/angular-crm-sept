import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Angular-crm');
  protected authent = inject(Authentication);
  protected user = this.authent.user;
  private router = inject(Router);

  protected display(val: string) {
    console.log(val, 'from parents');
  }

  protected disconnect() {
    this.authent.disconnect();
    this.router.navigateByUrl('/login');
  }
}
