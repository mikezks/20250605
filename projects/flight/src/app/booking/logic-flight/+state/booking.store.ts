import { computed, inject } from "@angular/core";
import { mapResponse } from "@ngrx/operators";
import { signalStore, type, withComputed, withState } from "@ngrx/signals";
import { entityConfig, removeAllEntities, setAllEntities, setEntity, updateEntity, withEntities } from "@ngrx/signals/entities";
import { Events, on, withEffects, withReducer } from "@ngrx/signals/events";
import { switchMap } from "rxjs";
import { FlightService } from "../data-access/flight.service";
import { Flight } from "../model/flight";
import { FlightFilter } from "../model/flight-filter";
import { flightEvents } from "./flight.events";
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
  // Reducer / Updater
  withReducer(
    on(flightEvents.flightFilterChanged, ({ payload: filter }) => ({ filter })),
    on(flightEvents.flightsChanged, ({ payload: flights }) =>
      setAllEntities(flights, flightConfig)),
    on(flightEvents.flightResetTriggered, () => removeAllEntities(flightConfig)),
    on(flightEvents.flightChanged, ({ payload: flight }) =>
      setEntity(flight, flightConfig)),
    on(flightEvents.basketChanged, ({ payload: updateBasket }) => state => ({
      basket: {
        ...state.basket,
        [updateBasket.id]: updateBasket.selected
      }
    })),
    on(flightEvents.flightDelayTriggered, ({ payload: delayState }) => 
      updateEntity({ id: delayState.id, changes: flight => ({
        date: addMinutes(flight.date, delayState.delayInMin)
      })}, flightConfig)
    ),
  ),
  // Side-Effects
  withEffects((
    store,
    events = inject(Events),
    flightService = inject(FlightService)
  ) => ({
    loadFlights$: events
      .on(flightEvents.flightFilterChanged)
      .pipe(
        switchMap(({ payload: filter }) => flightService.find(
          filter.from, filter.to,filter.urgent
        )),
        mapResponse({
          next: flights => flightEvents.flightsChanged(flights),
          error: err => flightEvents.flightChangedError(err)
        })
      )
  })),
);
