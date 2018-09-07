import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { MultiStepCheckoutPageGuard } from './multi-step-checkout-page.guard';

export const guards: any[] = [
  OrderConfirmationPageGuard,
  MultiStepCheckoutPageGuard
];
