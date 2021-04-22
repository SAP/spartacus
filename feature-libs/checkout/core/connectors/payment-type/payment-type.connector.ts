import { Injectable } from '@angular/core';
import { PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PaymentTypeAdapter } from './payment-type.adapter';

@Injectable()
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
