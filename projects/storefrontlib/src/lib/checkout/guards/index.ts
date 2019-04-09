import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutGuard } from './checkout.guard';
import { EmptyCartGuard } from './empty-cart.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  CheckoutGuard,
  EmptyCartGuard,
];
