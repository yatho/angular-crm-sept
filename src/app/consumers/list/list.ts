import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Consumers } from '../consumers';
import { Router, RouterLink } from '@angular/router';
import { ConsumerData } from '../model/consumer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { PhonePipe } from '../../common/phone-pipe';

@Component({
  selector: 'crm-list',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    RouterLink,
    MatIcon,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    PhonePipe,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  private readonly consumerService = inject(Consumers);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  consumers = signal<ConsumerData[]>([]);
  search = signal('');
  displayedColumns: string[] = ['civility', 'firstname', 'lastname', 'email', 'phone', 'actions'];

  ngOnInit() {
    this.find();
  }

  find(search?: string): void {
    if (search !== undefined) {
      this.search.set(search);
    }
    this.consumerService
      .find(this.search())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((consumers) => {
        this.consumers.set(consumers);
      });
  }

  edit(consumer: ConsumerData): void {
    this.router.navigateByUrl(`/consumer-fiche/${consumer.id}`);
  }

  delete(consumer: ConsumerData): void {
    if (confirm(`Are you sure you want to remove ${consumer.firstname} ${consumer.lastname}?`)) {
      this.consumerService
        .remove(consumer.id!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.find());
    }
  }
}
