import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from "@angular/core"
import { FlightService } from "./booking/api-boarding";
import { delay } from "rxjs";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => ''
});

export function provideApiBaseUrl(apiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: apiUrl
    }
  ]);
}

export function injectFlightApiUrl(): string {
  return inject(API_BASE_URL) + '/flight';
}

export function provideInitialFlights(
  departureCityName: string,
  delayInSec = 1
): EnvironmentProviders {
  return provideAppInitializer((
    flightService = inject(FlightService)
  ) => flightService.find(departureCityName, '').pipe(
    delay(delayInSec * 1_000)
  ))
}