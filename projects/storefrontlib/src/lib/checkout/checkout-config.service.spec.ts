import { CheckoutConfig } from './config/checkout-config';
import { CheckoutConfigService } from './checkout-config.service';
import { CheckoutStepType, CheckoutStep } from './model/checkout-step.model';

const mockCheckoutStepType = CheckoutStepType.shippingAddress;

const mockCheckoutSteps: CheckoutStep[] = [
  {
    id: 'shippingAddress',
    name: 'checkoutProgress.label.shippingAddress',
    url: '/checkout/shipping-address',
    type: [CheckoutStepType.shippingAddress],
  },
];

const mockCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: mockCheckoutSteps,
  },
};

describe('CheckoutConfigService', () => {
  let service: CheckoutConfigService;

  beforeEach(() => {
    service = new CheckoutConfigService(mockCheckoutConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get checkout step by type', () => {
    const type = mockCheckoutStepType;

    expect(service.getCheckoutStep(type)).toEqual(mockCheckoutSteps[0]);
  });

  // @todo: figure out a way to test next and previous steps
});
