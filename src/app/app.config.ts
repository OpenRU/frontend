import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { progressBarInterceptor } from './interceptors/progress-bar.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, progressBarInterceptor])),
    {
      provide: LOCALE_ID, useValue: 'pt-BR',
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
    }
  ],
};
