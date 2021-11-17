import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutCostCenterAdapter } from './checkout-cost-center.adapter';

@Injectable()
export class CheckoutCostCenterConnector {
  constructor(protected adapter: CheckoutCostCenterAdapter) {}

  setCostCenter(
    userId: string,
    cartId: string,
    costCenterId: string
  ): Observable<Cart> {
    return this.adapter.setCostCenter(userId, cartId, costCenterId);
  }
}
