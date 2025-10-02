import {
    HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ProgressBarService } from '../services/progress-bar.service';

export const SHOW_PROGRESSBAR = new HttpContextToken<boolean>(() => false);

export const progressBarInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const progressBarService = inject(ProgressBarService);

  const progressBar = req.context.get(SHOW_PROGRESSBAR);

  if (progressBar) {
    progressBarService.start();
  }

  return next(req).pipe(
    finalize(() => {
        if (progressBar) {
            progressBarService.stop();
        }
    })
  );
};
