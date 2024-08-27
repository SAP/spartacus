import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';

@Injectable()
export class OrderOverviewComponentService {
  showDeliveryMode(mode: DeliveryMode): boolean {
    return mode !== undefined;
  }
}
