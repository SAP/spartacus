import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { ShippingAddressSetGuard } from './shipping-address-set.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  ShippingAddressSetGuard,
];
