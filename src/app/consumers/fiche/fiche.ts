import { MatCardModule } from '@angular/material/card';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import { Consumers } from '../consumers';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsumerData } from '../model/consumer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormError } from '../../form-error/form-error';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'crm-fiche',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    FormError,
    MatIcon,
    MatInput,
    MatCardModule,
  ],
  templateUrl: './fiche.html',
  styleUrl: './fiche.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fiche {
  private readonly consumerService = inject(Consumers);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  protected id = input<number | undefined>();

  protected consumerForm = new FormGroup({
    id: new FormControl<number>(0, {
      nonNullable: true,
    }),
    civility: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    firstname: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastname: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^0[1-9]([-. ]?[0-9]{2}){4}$')],
      nonNullable: true,
    }),
  });

  ngOnInit() {
    if (this.id()) {
      this.consumerService
        .getById(this.id()!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((c: ConsumerData) => this.consumerForm.patchValue(c));
    }
  }

  onSubmit() {
    if (this.consumerForm.invalid) {
      return;
    }
    const consumer = this.consumerForm.getRawValue();
    let consumerObs;
    if (consumer.id) {
      consumerObs = this.consumerService.update(consumer);
    } else {
      consumerObs = this.consumerService.create(consumer);
    }
    consumerObs.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.location.back());
  }

  cancel() {
    this.location.back();
  }
}
