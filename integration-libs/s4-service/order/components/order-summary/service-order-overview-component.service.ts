import { inject, Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { OrderOverviewComponentService } from '@spartacus/order/components';
import { ServiceDeliveryModeConfig } from '@spartacus/s4-service/root';

@Injectable()
export class ServiceOrderOverviewComponentService extends OrderOverviewComponentService {
  protected config = inject(ServiceDeliveryModeConfig);
  showDeliveryMode(mode: DeliveryMode): boolean {
    return mode.code === this.config.serviceDeliveryMode?.code ? false : true;
  }
}
