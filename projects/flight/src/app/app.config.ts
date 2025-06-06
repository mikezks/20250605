import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideApiBaseUrl, provideInitialFlights } from './app.providers';
import { provideNavigationService } from './shared/logic-navigation';
import { APP_NAVIGATION } from './app.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
    ),
    provideNavigationService(APP_NAVIGATION),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    provideApiBaseUrl('https://demo.angulararchitects.io/api'),
    // provideInitialFlights('London', 10),
  ]
};
