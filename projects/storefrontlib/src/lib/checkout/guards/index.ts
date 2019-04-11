import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutGuard } from './checkout.guard';

export const guards: any[] = [OrderConfirmationPageGuard, CheckoutGuard];
