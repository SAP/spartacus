import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentTypeAdapter } from './payment-type.adapter';
import { PaymentType } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeConnector {
  constructor(protected adapter: PaymentTypeAdapter) {}

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.adapter.loadPaymentTypes();
  }

  setPaymentType(
    userId: string,
    cartId: string,
    typeCode: string,
    poNumber?: string
  ): Observable<any> {
    return this.adapter.setPaymentType(userId, cartId, typeCode, poNumber);
  }
}
