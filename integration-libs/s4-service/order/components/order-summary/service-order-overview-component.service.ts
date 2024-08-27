import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { OrderOverviewComponentService } from '@spartacus/order/components';
import { SERVICE_DELIVERY_MODE } from '@spartacus/s4-service/root';

@Injectable()
export class ServiceOrderOverviewComponentService extends OrderOverviewComponentService {
  showDeliveryMode(mode: DeliveryMode): boolean {
    return mode.code === SERVICE_DELIVERY_MODE ? false : true;
  }
}
