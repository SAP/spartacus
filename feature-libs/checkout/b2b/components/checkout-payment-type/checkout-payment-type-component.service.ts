import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CheckoutPaymentTypeComponentService {
  isPONumberReadOnly(): Observable<boolean> {
    return of(false);
  }
}
