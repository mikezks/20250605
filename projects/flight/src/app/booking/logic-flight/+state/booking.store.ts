import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Flight } from "../model/flight";
import { computed, inject } from "@angular/core";
import { FlightFilter } from "../model/flight-filter";
import { FlightService } from "../data-access/flight.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { pipe, switchMap } from "rxjs";
import { setAllEntities, setEntity, withEntities } from "@ngrx/signals/entities";


interface BookingState {
  filter: FlightFilter;
  basket: Record<number, boolean>;
}

const initialBookingState: BookingState = {
  filter: {
    from: 'Hamburg',
    to: 'Graz',
    urgent: false
  },
  basket: {
    3: true,
    5: true, 
  },
};

const flightEntityState = {
  entities: {
    3: {
      id: 3,
      from: 'Hamburg',
      to: 'Graz',
      date: '2025-06-06',
      delayed: false
    },
    5: {
      id: 5,
      from: 'Hamburg',
      to: 'Graz',
      date: '2025-06-06',
      delayed: false
    }
  },
  ids: [5, 3]
};


export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState(initialBookingState),
  withEntities({ entity: type<Flight>(), collection: 'flight' }),
  withComputed(store => ({
    delayedFlights: computed(
      () => store.flightEntities().filter(flight => flight.delayed)
    ),
    flightRoute: computed(
      () => 'From ' + store.filter().from + ' to ' + store.filter().to + '.'
    )
  })),
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlight: (flight: Flight) => patchState(store, 
      setEntity(flight, { collection: 'flight' })
    ),
    setFlights: (flights: Flight[]) => patchState(store, 
      setAllEntities(flights, { collection: 'flight' })
    ),
    updateBasket: (id: number, selected: boolean) => patchState(store, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    })),
  })),
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: rxMethod<FlightFilter>(pipe(
      switchMap(filter => flightService.find(
        filter.from, filter.to,filter.urgent
      )),
      tapResponse({
        next: flights => store.setFlights(flights),
        error: err => console.error(err)
      })
    ))
  })),
  withHooks(store => ({
    onInit: () => store.loadFlights(store.filter)
  })),
);
