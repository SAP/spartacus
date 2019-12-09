import { Address } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { DeliveryMode } from '../../model/order.model';

export type CheckoutDetails = {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
};
