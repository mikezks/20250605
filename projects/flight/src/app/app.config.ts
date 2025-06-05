import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withDebugTracing, withPreloading } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      // withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools()
  ]
};
