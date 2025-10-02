import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { environment } from '../../environments/environment.development';
import { SHOW_PROGRESSBAR } from '../interceptors/progress-bar.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.apiUrl.auth;

  login(login: string, password: string): Observable<LoginRequest> {
    return this.httpClient.post<LoginRequest>(
      `${this.apiUrl}/auth/login/`, { login, password }, 
      {
        context: new HttpContext().set(SHOW_PROGRESSBAR, true),
      })
      .pipe(tap((res) => {
          if (!res.token) {
            throwError(() => new Error);
          }
          this.tokenService.saveToken(res.token);
        }),
        catchError((error: HttpErrorResponse) => this.handleAuthError(error, 'Ocorreu um erro.'),
      ),
    );
  }

  register(data: RegisterRequest): Observable<RegisterRequest> {
    return this.httpClient.post<RegisterRequest>(
      `${this.apiUrl}/auth/register/`, data, 
      {
        context: new HttpContext().set(SHOW_PROGRESSBAR, true),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleAuthError(error, 'Ocorreu um erro.'),
      ),
    );
  }
  
  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  private handleAuthError(httpError: HttpErrorResponse, defaultMessage: string): Observable<never> {
    let message = httpError.message || defaultMessage;
    const INVALID_CREDENTIALS = httpError.status === 401;
    const INVALID_DATA = httpError.status === 409;

    if (INVALID_CREDENTIALS) {
      message = 'Credenciais inválidas';
    }

    if (INVALID_DATA) {
      message = 'Dados';
    }

    return throwError(() => new Error(message));
  }
}
