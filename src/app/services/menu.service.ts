import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import {  catchError, Observable, throwError } from 'rxjs';
import { Menu } from '../models/menu/menu.model';
import { environment } from '../../environments/environment.development';
import { SHOW_PROGRESSBAR } from '../interceptors/progress-bar.interceptor';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl.menu;

  getAllMenus(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.apiUrl}/`);
  }

  getMenuToday(): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.apiUrl}/today`);
  }

  createMenu(data: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(`${this.apiUrl}/`, data)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleMenuError(error, 'Ocorreu um erro.')),
    );
  }

  deleteMenu(id: number): Observable<Menu> {
    return this.httpClient.delete<Menu>(`${this.apiUrl}/${id}`)
  }

  private handleMenuError(httpError: HttpErrorResponse, defaultMessage: string) {
    let message = httpError.message || defaultMessage;
    const MENU_ALREADY_EXISTS = httpError.status === 409;

    if (MENU_ALREADY_EXISTS) {
      message = 'Já existe um cardápio cadastrado para esta data';
    }

    return throwError(() => new Error(message));
  }
}
