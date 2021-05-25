import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CheckoutCostCenterAdapter } from './checkout-cost-center.adapter';
import { Cart } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
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
