import { Injectable } from '@angular/core';
import { UserPaymentAdapter } from './user-payment.adapter';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentConnector {
  constructor(protected adapter: UserPaymentAdapter) {}

  getAll(userId: string): Observable<PaymentDetails[]> {
    return this.adapter.loadAll(userId);
  }

  delete(userId: string, paymentMethodID: string): Observable<{}> {
    return this.adapter.delete(userId, paymentMethodID);
  }

  setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    return this.adapter.setDefault(userId, paymentMethodID);
  }
}
