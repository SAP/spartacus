import { TestBed } from '@angular/core/testing';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import { ClearCheckoutService } from './clear-checkout.service';

class MockCheckoutDeliveryFacade implements Partial<CheckoutDeliveryFacade> {
  resetSetDeliveryAddressProcess() {}
  resetSetDeliveryModeProcess() {}
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  resetSetPaymentDetailsProcess() {}
}

describe('ClearCheckoutService', () => {
  let service: ClearCheckoutService;
  let checkoutDeliveryFacade: CheckoutDeliveryFacade;
  let checkoutPaymentService: CheckoutPaymentFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClearCheckoutService,
        {
          provide: CheckoutDeliveryFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
      ],
    });

    service = TestBed.inject(ClearCheckoutService);
    checkoutDeliveryFacade = TestBed.inject(CheckoutDeliveryFacade);
    checkoutPaymentService = TestBed.inject(CheckoutPaymentFacade);

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
