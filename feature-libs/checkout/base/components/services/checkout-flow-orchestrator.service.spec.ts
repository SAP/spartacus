import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { BaseSiteService } from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutConfig } from '../../root/config';
import { CheckoutFlowOrchestratorService } from './checkout-flow-orchestrator.service';

const mockFlowName = 'test-flow';

const mockCheckoutConfig: CheckoutConfig = {
  checkout: {
    flows: {
      [mockFlowName]: {
        steps: [],
        guest: false,
      },
    },
  },
};

describe('CheckoutFlowOrchestratorService', () => {
  let service: CheckoutFlowOrchestratorService;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [CheckoutFlowOrchestratorService, BaseSiteService],
    });

    baseSiteService = TestBed.inject(BaseSiteService);
    service = new CheckoutFlowOrchestratorService(
      mockCheckoutConfig,
      baseSiteService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get payment provider', () => {
    const mockPaymentProvider = 'MockPaymentProvider';
    spyOn(baseSiteService, 'get').and.returnValue(
      of({ baseStore: { paymentProvider: mockPaymentProvider } })
    );

    service.getPaymentProvider().subscribe((paymentProvider) => {
      expect(paymentProvider).toEqual(mockPaymentProvider);
    });
  });

  it('should get checkout flow when payment provider is defined', () => {
    service['paymentProviderName'] = mockFlowName;

    const checkoutFlow = service.getCheckoutFlow();
    expect(checkoutFlow).toEqual(
      mockCheckoutConfig.checkout?.flows?.[mockFlowName]
    );
  });

  it('should return undefined for checkout flow when payment provider is undefined', () => {
    service['paymentProviderName'] = undefined;

    const checkoutFlow = service.getCheckoutFlow();
    expect(checkoutFlow).toBeUndefined();
  });
});
