import { Component, inject } from '@angular/core';
import { DemoObservable } from '../common/demo-observable';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'crm-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected demoObs = inject(DemoObservable).getObservable().pipe(takeUntilDestroyed());

  protected clicked() {
    this.demoObs.subscribe({
      error: () => {},
    });
  }
}
