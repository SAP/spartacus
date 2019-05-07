import { CheckoutStepType } from '../config/default-checkout-config';

export interface CheckoutStep {
  id: string;
  name: string;
  url: string;
  type: Array<CheckoutStepType>;
}
