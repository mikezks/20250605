import { JsonPipe } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
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
  private ticketsFacade = injectTicketsFacade();

  protected filter = this.ticketsFacade.filter;
  protected route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket = this.ticketsFacade.basket;
  protected flights = this.ticketsFacade.flights

  constructor() {
    effect(() => console.log(this.route()));
    effect(() => this.search());
  }

  protected search(): void {
    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search();
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.updateFlight(newFlight);
  }

  protected updateFilter(filter: FlightFilter): void {
    this.ticketsFacade.updateFilter(filter);
  }

  protected updateBasket(id: number, selected: boolean): void {
    this.ticketsFacade.updateBasket(id, selected);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
