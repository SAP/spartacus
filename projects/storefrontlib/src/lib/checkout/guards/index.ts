import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutGuard } from './checkout.guard';
import { DeliveryModeSetGuard } from './delivery-mode-set.guard';
import { ShippingAddressSetGuard } from './shipping-address-set.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  DeliveryModeSetGuard,
  CheckoutGuard,
  ShippingAddressSetGuard,
];
