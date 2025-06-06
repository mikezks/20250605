import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectDispatch } from '@ngrx/signals/events';
import { BookingStore } from '../../logic-flight';
import { flightEvents } from '../../logic-flight/+state/flight.events';
import { FlightFilterComponent } from '../../ui-flight';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';


@Component({
  selector: 'app-flight-search',
  imports: [
    JsonPipe,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  protected store = inject(BookingStore);
  protected flightEvents = injectDispatch(flightEvents);
}
