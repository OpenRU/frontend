import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Items } from '../models/stock/items.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl.items;

  getAllItems(): Observable<Items[]> {
    return this.httpClient.get<Items[]>(this.apiUrl);
  }

  createItems(items: Items): Observable<Items> {
    return this.httpClient.post<Items>(this.apiUrl, items).pipe(
      catchError((error: HttpErrorResponse) => this.handleStockError(error, 'Ocorreu um erro.')),
    );
  }

  deleteItems(id: number): Observable<Items>  {
    return this.httpClient.delete<Items>(`${this.apiUrl}/${id}`);
  }

  private handleStockError(httpError: HttpErrorResponse, defaultMessage: string): Observable<never> {
    let message = httpError.error?.message || defaultMessage;
    const SAME_NAMES = httpError.status === 409;

    if (SAME_NAMES) {
      message = 'O nome do item deve ser diferente do fornecedor.'
    }

    return throwError(() => new Error(message));
  }
}
