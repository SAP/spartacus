import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentType } from '../../../model/cart.model';
import { PaymentTypeAdapter } from './payment-type.adapter';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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
