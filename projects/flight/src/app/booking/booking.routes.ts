import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { DepatureComponent } from "../boarding/feature-departure";
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "./feature-flight";
import { MyFlightsComponent } from "./feature-flight/my-flights/my-flights.component";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { resolveFlight } from "./logic-flight/data-access/flight.resolver";
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from "@angular/common/http";
import { tap } from "rxjs";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
      provideHttpClient(
        withInterceptors([
          (req, next) => next(req).pipe(
            tap(resp => console.log('Environment Injector Booking', resp))
          )
        ]),
        withRequestsMadeViaParent()
      )
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: {
              flight: resolveFlight
            }
          },
          {
            path: 'departures',
            component: DepatureComponent
          }
        ]
      },
      {
        path: 'my-flights',
        component: MyFlightsComponent,
      }
    ]
  }
];

export default BOOKING_ROUTES;
