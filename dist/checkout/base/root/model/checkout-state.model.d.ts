import { DeliveryMode, PaymentDetails } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
export interface CheckoutState {
    deliveryAddress?: Address;
    deliveryMode?: DeliveryMode;
    paymentInfo?: PaymentDetails;
}
