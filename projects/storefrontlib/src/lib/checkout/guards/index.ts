import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutGuard } from './checkout.guard';
import { EmptyCartGuard } from './empty-cart.guard';
import { ShippingAddressSetGuard } from './shipping-address-set.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  CheckoutGuard,
  EmptyCartGuard,
  ShippingAddressSetGuard,
];
