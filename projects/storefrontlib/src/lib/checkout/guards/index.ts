import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutGuard } from './checkout.guard';
import { DeliveryModeSetGuard } from './delivery-mode-set.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  DeliveryModeSetGuard,
  CheckoutGuard,
];
