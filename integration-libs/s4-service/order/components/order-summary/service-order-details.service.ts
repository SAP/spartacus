import { DeliveryMode } from '@spartacus/cart/base/root';
import { OrderDetailsService } from '@spartacus/order/components';
import { SERVICE_DELIVERY_MODE } from '@spartacus/s4-service/root';

export class ServiceOrderDetails extends OrderDetailsService {
  hasDeliveryMode(mode: DeliveryMode): Boolean {
    return mode.code !== SERVICE_DELIVERY_MODE;
  }
}
