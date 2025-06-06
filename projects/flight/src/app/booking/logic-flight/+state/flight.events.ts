import { eventGroup } from "@ngrx/signals/events";
import { FlightFilter } from "../model/flight-filter";
import { type } from "@ngrx/signals";
import { Flight } from "../model/flight";


export const flightEvents = eventGroup({
  source: 'Flight',
  events: {
    flightFilterChanged: type<FlightFilter>(),
    flightsChanged: type<Flight[]>(),
    flightChanged: type<Flight>(),
    flightChangedError: type<unknown>(),
    flightResetTriggered: type<void>(),
    basketChanged: type<{ id: number, selected: boolean }>(),
    flightDelayTriggered: type<{ id: number, delayInMin: number }>(),
  }
});
