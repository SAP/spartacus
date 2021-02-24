import { TestBed } from '@angular/core/testing';
import { CheckoutDeliveryService } from '../facade/checkout-delivery.service';
import { CheckoutPaymentService } from '../facade/checkout-payment.service';
import { ClearCheckoutService } from './clear-checkout.service';

class MockCheckoutDeliveryService implements Partial<CheckoutDeliveryService> {
  resetSetDeliveryAddressProcess() {}
  resetSetDeliveryModeProcess() {}
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentService> {
  resetSetPaymentDetailsProcess() {}
}

describe('ClearCheckoutService', () => {
  let service: ClearCheckoutService;
  let checkoutDeliveryService: CheckoutDeliveryService;
  let checkoutPaymentService: CheckoutPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClearCheckoutService,
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
      ],
    });

    service = TestBed.inject(ClearCheckoutService);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
    checkoutPaymentService = TestBed.inject(CheckoutPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should reset checkout', () => {
    service.resetCheckoutProcesses();

    it('delivery address process', () => {
      spyOn(
        checkoutDeliveryService,
        'resetSetDeliveryAddressProcess'
      ).and.callThrough();

      expect(
        checkoutDeliveryService.resetSetDeliveryAddressProcess
      ).toHaveBeenCalled();
    });

    it('delivery mode process', () => {
      spyOn(
        checkoutDeliveryService,
        'resetSetDeliveryModeProcess'
      ).and.callThrough();

      expect(
        checkoutDeliveryService.resetSetDeliveryModeProcess
      ).toHaveBeenCalled();
    });

    it('payment details process', () => {
      spyOn(
        checkoutPaymentService,
        'resetSetPaymentDetailsProcess'
      ).and.callThrough();

      expect(
        checkoutPaymentService.resetSetPaymentDetailsProcess
      ).toHaveBeenCalled();
    });
  });
});
