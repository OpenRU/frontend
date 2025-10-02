import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  isLoading = new BehaviorSubject<boolean>(false);

  start(): void {
    if (!this.isLoading.value) {
      this.isLoading.next(true);
    }
  }

  stop(): void {
    if (this.isLoading.value) {
      this.isLoading.next(false);
    }
  }
}
