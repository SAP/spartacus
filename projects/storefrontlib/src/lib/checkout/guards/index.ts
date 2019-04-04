import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { SetShippingAddressGuard } from './set-shipping-address.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  SetShippingAddressGuard,
];
