import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDeliveryModesAdapter } from './checkout-delivery-modes.adapter';

@Injectable()
export class CheckoutDeliveryModesConnector {
  constructor(protected adapter: CheckoutDeliveryModesAdapter) {}

  public setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown> {
    return this.adapter.setMode(userId, cartId, deliveryModeId);
  }

  public getMode(userId: string, cartId: string): Observable<DeliveryMode> {
    return this.adapter.getMode(userId, cartId);
  }

  public getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.adapter.getSupportedModes(userId, cartId);
  }

  public clearCheckoutDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<unknown> {
    return this.adapter.clearCheckoutDeliveryMode(userId, cartId);
  }
}
