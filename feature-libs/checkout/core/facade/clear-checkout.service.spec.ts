import { TestBed } from '@angular/core/testing';
import { CheckoutPaymentFacade } from '@spartacus/checkout/root';
import { ClearCheckoutService } from './clear-checkout.service';

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  resetSetPaymentDetailsProcess() {}
}

describe('ClearCheckoutService', () => {
  let service: ClearCheckoutService;
  let checkoutPaymentService: CheckoutPaymentFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClearCheckoutService,
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
      ],
    });

    service = TestBed.inject(ClearCheckoutService);
    checkoutPaymentService = TestBed.inject(CheckoutPaymentFacade);

    spyOn(checkoutPaymentService, 'resetSetPaymentDetailsProcess');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should reset checkout', () => {
    beforeEach(() => {
      service.resetCheckoutProcesses();
    });

    it('payment details process', () => {
      expect(
        checkoutPaymentService.resetSetPaymentDetailsProcess
      ).toHaveBeenCalled();
    });
  });
});
