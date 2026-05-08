import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ServiceHealthService } from '../services/service-health.service';

const buildMessage = (status: number, label: string): string => {
  if (status === 503) {
    return `${label} is temporarily unavailable.`;
  }
  if (status === 0) {
    return `${label} is unreachable right now.`;
  }
  return `${label} is having trouble right now.`;
};

export const serviceHealthInterceptor: HttpInterceptorFn = (req, next) => {
  const health = inject(ServiceHealthService);
  const scope = health.resolveScope(req.url);

  return next(req).pipe(
    tap({
      next: () => health.markAvailable(scope.key)
    }),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 503 || err.status === 0) {
        health.markUnavailable(scope.key, scope.label, buildMessage(err.status, scope.label));
      }

      return throwError(() => err);
    })
  );
};
