import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { ShippingAddressSetGuard } from './shipping-address-set-guard.service';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  ShippingAddressSetGuard,
];
