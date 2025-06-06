import { NgIf } from '@angular/common';
import { Component, computed, effect, inject, input, numberAttribute, ResourceStatus, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { initialPassenger, Passenger } from '../../logic-passenger';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { validatePassengerStatus } from '../../util-validation';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';


@Component({
  selector: 'app-passenger-edit',
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private readonly passengerService = inject(PassengerService);
  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: {
      id: this.id()
    }
  }));
  protected readonly passengerResStatus = computed(
    () => ResourceStatus[this.passengerResource.status()]
  );

  constructor() {
    effect(() => {
      if (this.passengerResource.hasValue()) {
        this.editForm.patchValue(this.passengerResource.value())
      }
    });
    setTimeout(() => this.passengerResource.set({
      ...initialPassenger,
      firstName: 'Trainer was here! :)'
    }), 3_000);
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
