import { inject } from "@angular/core"
import { FlightFilter } from "../model/flight-filter";
import { Flight } from "../model/flight";
import { BookingStore } from "./booking.store";


export function injectTicketsFacade() {
  const store = inject(BookingStore);

  return {
    filter: store.filter,
    basket: store.basket,
    flights: store.flights,
    search: () => {
      store.loadFlights(store.filter);
    },
    updateFilter: (filter: FlightFilter) => store.setFilter(filter),
    updateBasket: (id: number, selected: boolean) => store.updateBasket(id, selected),
    updateFlight: (flight: Flight) => {},
    reset: () => store.setFlights([])
  };
}
