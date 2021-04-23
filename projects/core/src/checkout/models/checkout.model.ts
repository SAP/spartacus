import { Address } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { DeliveryMode } from '../../model/order.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export type CheckoutDetails = {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
};
