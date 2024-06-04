import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  Address,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  PaymentDetails,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { DpCheckoutPaymentService } from './../../../facade/dp-checkout-payment.service';
import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';
import { DpPaymentRequest } from './../../../models/dp-checkout.model';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { CheckoutBillingAddressFormService } from '@spartacus/checkout/base/components';

class MockDpCheckoutPaymentService
  implements Partial<DpCheckoutPaymentService>
{
  createPaymentDetails(): Observable<PaymentDetails> {
    return of({});
  }
}

class MockDpLocalStorageService implements Partial<DpLocalStorageService> {
  readCardRegistrationState(): DpPaymentRequest {
    return {};
  }
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string) {
    return false;
  }
}

class MockCheckoutBillingAddressFormService
  implements Partial<CheckoutBillingAddressFormService>
{
  markAllAsTouched(): void {}
  isBillingAddressSameAsDeliveryAddress(): boolean {
    return true;
  }
  getBillingAddress(): Address {
    return {};
  }
  isBillingAddressFormValid(): boolean {
    return true;
  }
}

const mockActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    }),
  },
};

const emptyActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({}),
  },
};

const mockSessionId = 'mockSesionId';
const mockSignature = 'mockSignature';

const mockPaymentDetails: PaymentDetails = {
  id: 'mockId',
  cardNumber: '***********1234',
};

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('DpPaymentCallbackComponent with success query param', () => {
  let component: DpPaymentCallbackComponent;
  let fixture: ComponentFixture<DpPaymentCallbackComponent>;
  let dpPaymentService: DpCheckoutPaymentService;
  let dpStorageService: DpLocalStorageService;
  let msgService: GlobalMessageService;
  let featureConfig: FeatureConfigService;
  let billingAddressService: CheckoutBillingAddressFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), StoreModule.forRoot({})],
      declarations: [
        DpPaymentCallbackComponent,
        MockTranslatePipe,
        MockSpinnerComponent,
      ],
      providers: [
        {
          provide: DpPaymentCallbackComponent,
          useClass: DpPaymentCallbackComponent,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: DpCheckoutPaymentService,
          useClass: MockDpCheckoutPaymentService,
        },
        {
          provide: DpLocalStorageService,
          useClass: MockDpLocalStorageService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageService,
        },
        {
          provide: CheckoutBillingAddressFormService,
          useClass: MockCheckoutBillingAddressFormService,
        },
      ],
    }).compileComponents();

    dpPaymentService = TestBed.inject(DpCheckoutPaymentService);
    dpStorageService = TestBed.inject(DpLocalStorageService);
    msgService = TestBed.inject(GlobalMessageService);
    featureConfig = TestBed.inject(FeatureConfigService);
    billingAddressService = TestBed.inject(CheckoutBillingAddressFormService);
    spyOn(msgService, 'add').and.stub();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.closeCallback, 'emit').and.callThrough();
    spyOn(component.paymentDetailsAdded, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should fetch payment details', () => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(
        of(mockPaymentDetails)
      );

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        undefined
      );
    });

    it('should show payment fetch error when empty payment details', () => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(of({}));

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        undefined
      );
      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.error.paymentFetch' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
    });

    it('should show unknown error when empty payment request', () => {
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue({});

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.error.unknown' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
    });
    it('should show no error when correct payment details', () => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(
        of(mockPaymentDetails)
      );

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        undefined
      );
      expect(component.paymentDetailsAdded.emit).toHaveBeenCalledWith(
        mockPaymentDetails
      );
    });
  });

  describe('Billing Address Form', () => {
    beforeEach(() => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(
        of(mockPaymentDetails)
      );
    });
    it('should show billing address when feature flag is set and card added successfully', () => {
      spyOn(featureConfig, 'isEnabled').and.returnValue(true);
      component.ngOnInit();
      expect(component.showBillingAddressForm).toEqual(true);
      expect(dpStorageService.readCardRegistrationState).not.toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).not.toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        undefined
      );
    });
    it('should not show billing address when feature flag is not set', () => {
      spyOn(featureConfig, 'isEnabled').and.returnValue(false);
      component.ngOnInit();
      expect(component.showBillingAddressForm).toEqual(false);
      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        undefined
      );
    });
    describe('checking 2 buttons on billing address form', () => {
      beforeEach(()=>{
        spyOn(
          billingAddressService,
          'isBillingAddressSameAsDeliveryAddress'
        ).and.returnValue(true);
        spyOn(billingAddressService, 'isBillingAddressFormValid').and.returnValue(
          true
        );
        spyOn(billingAddressService, 'getBillingAddress').and.returnValue({});
      });
      it('should add payment details when `continue` is clicked', async () => {
        component.next(false);
        expect(component.paymentDetailsAdded.emit).toHaveBeenCalled();
      });
      it('should add payment details and go back when `save and back` is clicked', async () => {
        spyOn(component.paymentDetailsAddedAndGoBack, 'emit').and.callThrough();
        component.next(true);
        expect(component.paymentDetailsAddedAndGoBack.emit).toHaveBeenCalled();
      });
    });

    it('should send billing address if form is valid/billing address same as delivery address', () => {
      spyOn(
        billingAddressService,
        'isBillingAddressSameAsDeliveryAddress'
      ).and.returnValue(true);
      spyOn(billingAddressService, 'isBillingAddressFormValid').and.returnValue(
        true
      );
      spyOn(billingAddressService, 'getBillingAddress').and.returnValue({});
      component.next(false);
      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        {}
      );
    });
    it('should not send billing address if form is not valid & billing address is not same as delivery address', () => {
      spyOn(
        billingAddressService,
        'isBillingAddressSameAsDeliveryAddress'
      ).and.returnValue(false);
      spyOn(billingAddressService, 'isBillingAddressFormValid').and.returnValue(
        false
      );
      component.next(false);
      expect(dpStorageService.readCardRegistrationState).not.toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).not.toHaveBeenCalled();
    });
  });
});

describe('DpPaymentCallbackComponent without query param', () => {
  let component: DpPaymentCallbackComponent;
  let fixture: ComponentFixture<DpPaymentCallbackComponent>;
  let msgService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), StoreModule.forRoot({})],
      declarations: [
        DpPaymentCallbackComponent,
        MockTranslatePipe,
        MockSpinnerComponent,
      ],
      providers: [
        {
          provide: DpPaymentCallbackComponent,
          useClass: DpPaymentCallbackComponent,
        },
        {
          provide: ActivatedRoute,
          useValue: emptyActivatedRoute,
        },
        {
          provide: DpCheckoutPaymentService,
          useClass: MockDpCheckoutPaymentService,
        },
        {
          provide: DpLocalStorageService,
          useClass: MockDpLocalStorageService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageService,
        },
        {
          provide: CheckoutBillingAddressFormService,
          useClass: MockCheckoutBillingAddressFormService,
        },
      ],
    }).compileComponents();

    msgService = TestBed.inject(GlobalMessageService);

    spyOn(msgService, 'add').and.stub();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should show cancelled or failed error when cancelled', async () => {
      spyOn(component.closeCallback, 'emit').and.callThrough();

      component.ngOnInit();

      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.cancelledOrFailed' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
    });
  });
});
