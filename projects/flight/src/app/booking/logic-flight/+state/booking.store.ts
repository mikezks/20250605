import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Flight } from "../model/flight";
import { computed, inject } from "@angular/core";
import { FlightFilter } from "../model/flight-filter";
import { FlightService } from "../data-access/flight.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { pipe, switchMap } from "rxjs";
import { entityConfig, setAllEntities, setEntity, updateEntity, withEntities } from "@ngrx/signals/entities";
import { addMinutes } from "../../../shared/util-date";


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

const flightConfig = entityConfig({
  entity: type<Flight>(),
  collection: 'flight'
});


export const BookingStore = signalStore(
  // Provider
  { providedIn: 'root' },
  // State
  withState(initialBookingState),
  withEntities(flightConfig),
  // Selectors / Derived State
  withComputed(store => ({
    delayedFlights: computed(
      () => store.flightEntities().filter(flight => flight.delayed)
    ),
    flightRoute: computed(
      () => 'From ' + store.filter().from + ' to ' + store.filter().to + '.'
    )
  })),
  // Updaters
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlight: (flight: Flight) => patchState(store, 
      setEntity(flight, flightConfig)
    ),
    setFlights: (flights: Flight[]) => patchState(store, 
      setAllEntities(flights, flightConfig)
    ),
    addFlightDelay: (id: number, delayInMin: number) => patchState(store, 
      updateEntity({ id, changes: flight => ({
        date: addMinutes(flight.date, delayInMin)
      })}, flightConfig)
    ),
    updateBasket: (id: number, selected: boolean) => patchState(store, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    })),
  })),
  // Side-Effects
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
  // Store Lifecycle
  withHooks(store => ({
    onInit: () => store.loadFlights(store.filter)
  })),
);
