import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_NAVIGATION } from './app.navigation';
import { provideApiBaseUrl } from './app.providers';
import { APP_ROUTES } from './app.routes';
import { provideNavigationService } from './shared/logic-navigation';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { of, delay } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideExperimentalZonelessChangeDetection(),
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
    ),
    provideNavigationService(APP_NAVIGATION),
    provideHttpClient(
      withFetch()
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    provideApiBaseUrl('https://demo.angulararchitects.io/api'),
    provideClientHydration(
      withIncrementalHydration()
    ),
    // provideInitialFlights('London', 10),
    provideAppInitializer((
      id = inject(PLATFORM_ID)
    ) => isPlatformServer(id)
      ? of(true)
      : of(true).pipe(delay(10_000))
    )
  ]
};
