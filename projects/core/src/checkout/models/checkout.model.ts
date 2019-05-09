import {
  Address,
  DeliveryMode,
  PaymentDetails,
} from '../../occ/occ-models/index';

export type CheckoutDetails = {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
};
