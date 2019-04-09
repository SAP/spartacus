import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutGuard } from './checkout.guard';
import { DeliveryModePageGuard } from './delivery-mode.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  DeliveryModePageGuard,
  CheckoutGuard,
];
