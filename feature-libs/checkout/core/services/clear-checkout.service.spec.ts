import { TestBed } from '@angular/core/testing';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import { CheckoutPaymentService } from '../facade/checkout-payment.service';
import { ClearCheckoutService } from './clear-checkout.service';

class MockCheckoutDeliveryFacade implements Partial<CheckoutDeliveryFacade> {
  resetSetDeliveryAddressProcess() {}
  resetSetDeliveryModeProcess() {}
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentService> {
  resetSetPaymentDetailsProcess() {}
}

describe('ClearCheckoutService', () => {
  let service: ClearCheckoutService;
  let checkoutDeliveryFacade: CheckoutDeliveryFacade;
  let checkoutPaymentService: CheckoutPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClearCheckoutService,
        {
          provide: CheckoutDeliveryFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
      ],
    });

    service = TestBed.inject(ClearCheckoutService);
    checkoutDeliveryFacade = TestBed.inject(CheckoutDeliveryFacade);
    checkoutPaymentService = TestBed.inject(CheckoutPaymentService);

    spyOn(checkoutDeliveryFacade, 'resetSetDeliveryAddressProcess');
    spyOn(checkoutDeliveryFacade, 'resetSetDeliveryModeProcess');
    spyOn(checkoutPaymentService, 'resetSetPaymentDetailsProcess');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should reset checkout', () => {
    beforeEach(() => {
      service.resetCheckoutProcesses();
    });

    it('delivery address process', () => {
      expect(
        checkoutDeliveryFacade.resetSetDeliveryAddressProcess
      ).toHaveBeenCalled();
    });

    it('delivery mode process', () => {
      expect(
        checkoutDeliveryFacade.resetSetDeliveryModeProcess
      ).toHaveBeenCalled();
    });

    it('payment details process', () => {
      expect(
        checkoutPaymentService.resetSetPaymentDetailsProcess
      ).toHaveBeenCalled();
    });
  });
});
