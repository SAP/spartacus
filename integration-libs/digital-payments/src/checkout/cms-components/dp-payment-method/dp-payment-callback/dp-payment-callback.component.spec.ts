import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  CheckoutBillingAddressFormComponent,
  CheckoutBillingAddressFormService,
} from '@spartacus/checkout/base/components';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  MockTranslatePipe,
  PaymentDetails,
  TranslatePipe,
} from '@spartacus/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable, Subject, of, throwError } from 'rxjs';
import { DpCheckoutPaymentService } from './../../../facade/dp-checkout-payment.service';
import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';
import { DpPaymentRequest } from './../../../models/dp-checkout.model';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';

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
class MockLaunchDialogService {
  openDialog(_x: any, _y: any, _z: any) {
    return of({
      instance: { cardSaveCancelled: true },
    });
  }
}

@Component({
  selector: 'cx-checkout-billing-address-form',
  template: '',
})
class MockCheckoutBillingAddressFormComponent {}

describe('DpPaymentCallbackComponent with success query param', () => {
  let component: DpPaymentCallbackComponent;
  let fixture: ComponentFixture<DpPaymentCallbackComponent>;
  let dpPaymentService: DpCheckoutPaymentService;
  let dpStorageService: DpLocalStorageService;
  let msgService: GlobalMessageService;
  let billingAddressService: CheckoutBillingAddressFormService;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        DpPaymentCallbackComponent,
        I18nTestingModule,
      ],
      providers: [
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
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(DpPaymentCallbackComponent, {
        remove: {
          imports: [
            TranslatePipe,
            SpinnerComponent,
            CheckoutBillingAddressFormComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockSpinnerComponent,
            MockCheckoutBillingAddressFormComponent,
          ],
        },
      })
      .compileComponents();

    dpPaymentService = TestBed.inject(DpCheckoutPaymentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    dpStorageService = TestBed.inject(DpLocalStorageService);
    msgService = TestBed.inject(GlobalMessageService);
    billingAddressService = TestBed.inject(CheckoutBillingAddressFormService);
    vi.spyOn(msgService, 'add').mockImplementation(() => {});
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(component.closeCallback, 'emit');
    vi.spyOn(component.paymentDetailsAdded, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Billing Address Form', () => {
    beforeEach(() => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      vi.spyOn(dpStorageService, 'readCardRegistrationState').mockReturnValue(
        mockDpPaymentRequest
      );
      vi.spyOn(dpPaymentService, 'createPaymentDetails').mockReturnValue(
        of(mockPaymentDetails)
      );
    });
    it('should show billing address when card added successfully', () => {
      component.ngOnInit();
      expect(component.showBillingAddressForm).toEqual(true);
      expect(dpStorageService.readCardRegistrationState).not.toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).not.toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        undefined
      );
    });
    it('waits for Fiscal ID before creating payment details and ignores duplicate submissions', () => {
      const saved$ = new Subject<boolean>();
      component.submitAdditionalFields = vi.fn(() => saved$);
      vi.spyOn(component.submittingChange, 'emit');
      component.next();
      component.next();
      expect(component.submitAdditionalFields).toHaveBeenCalledTimes(1);
      expect(dpPaymentService.createPaymentDetails).not.toHaveBeenCalled();
      expect(component.submittingChange.emit).toHaveBeenCalledWith(true);
      saved$.next(true);
      saved$.complete();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledTimes(1);
      expect(component.paymentDetailsAdded.emit).toHaveBeenCalledWith(
        mockPaymentDetails
      );
      expect(component.submittingChange.emit).toHaveBeenLastCalledWith(false);
    });

    it('does not create a card when Fiscal ID validation or binding fails', () => {
      component.submitAdditionalFields = () => of(false);
      component.next();
      expect(dpPaymentService.createPaymentDetails).not.toHaveBeenCalled();
      expect(component.paymentDetailsAdded.emit).not.toHaveBeenCalled();
      expect(component.closeCallback.emit).not.toHaveBeenCalled();
      expect(component.submitting).toBe(false);
    });

    it('keeps the controls locked while payment details are being created', () => {
      const details$ = new Subject<PaymentDetails>();
      vi.mocked(dpPaymentService.createPaymentDetails).mockReturnValue(
        details$
      );
      fixture.nativeElement.querySelector('button.btn-primary').click();
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('button.btn-primary').disabled
      ).toBe(true);
      expect(
        fixture.nativeElement.querySelector('button.btn-secondary').disabled
      ).toBe(true);
      component.next();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledTimes(1);
      details$.next(mockPaymentDetails);
      details$.complete();
      expect(component.submitting).toBe(false);
    });

    it('allows retry if creating payment details fails', () => {
      vi.mocked(dpPaymentService.createPaymentDetails).mockReturnValue(
        throwError(() => new Error('failed'))
      );
      component.next();
      expect(component.submitting).toBe(false);
      expect(component.paymentDetailsAdded.emit).not.toHaveBeenCalled();
      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.error.paymentFetch' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      vi.mocked(dpPaymentService.createPaymentDetails).mockReturnValue(
        of(mockPaymentDetails)
      );
      component.next();
      expect(component.paymentDetailsAdded.emit).toHaveBeenCalledWith(
        mockPaymentDetails
      );
    });

    it('cancels pending Fiscal ID submission when the callback is destroyed', () => {
      const saved$ = new Subject<boolean>();
      component.submitAdditionalFields = () => saved$;
      component.next();
      fixture.destroy();
      saved$.next(true);
      saved$.complete();
      expect(dpPaymentService.createPaymentDetails).not.toHaveBeenCalled();
    });
    describe('checking 2 buttons on billing address form', () => {
      beforeEach(() => {
        vi.spyOn(
          billingAddressService,
          'isBillingAddressSameAsDeliveryAddress'
        ).mockReturnValue(true);
        vi.spyOn(
          billingAddressService,
          'isBillingAddressFormValid'
        ).mockReturnValue(true);
        vi.spyOn(billingAddressService, 'getBillingAddress').mockReturnValue(
          {}
        );
      });
      it('should add payment details when `continue` is clicked', async () => {
        component.next();
        expect(component.paymentDetailsAdded.emit).toHaveBeenCalled();
      });
      it('should not add payment details and open a dialog when `back` is clicked', async () => {
        vi.spyOn(launchDialogService, 'openDialog');
        component.back();
        expect(launchDialogService.openDialog).toHaveBeenCalledWith(
          LAUNCH_CALLER.DP_SHOW_CONFIRMATION_DIALOG,
          undefined,
          undefined
        );
        expect(msgService.add).toHaveBeenCalledWith(
          { key: 'dpPaymentForm.cancelledOrFailed' },
          GlobalMessageType.MSG_TYPE_WARNING
        );
        expect(component.closeCallback.emit).toHaveBeenCalled();
      });
    });

    it('should send billing address if form is valid/billing address same as delivery address', () => {
      vi.spyOn(
        billingAddressService,
        'isBillingAddressSameAsDeliveryAddress'
      ).mockReturnValue(true);
      vi.spyOn(
        billingAddressService,
        'isBillingAddressFormValid'
      ).mockReturnValue(true);
      vi.spyOn(billingAddressService, 'getBillingAddress').mockReturnValue({});
      component.next();
      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature,
        {}
      );
    });
    it('should not send billing address if form is not valid & billing address is not same as delivery address', () => {
      vi.spyOn(
        billingAddressService,
        'isBillingAddressSameAsDeliveryAddress'
      ).mockReturnValue(false);
      vi.spyOn(
        billingAddressService,
        'isBillingAddressFormValid'
      ).mockReturnValue(false);
      component.next();
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
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        DpPaymentCallbackComponent,
        I18nTestingModule,
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
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(DpPaymentCallbackComponent, {
        remove: {
          imports: [
            TranslatePipe,
            SpinnerComponent,
            CheckoutBillingAddressFormComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockSpinnerComponent,
            MockCheckoutBillingAddressFormComponent,
          ],
        },
      })
      .compileComponents();

    msgService = TestBed.inject(GlobalMessageService);

    vi.spyOn(msgService, 'add').mockImplementation(() => {});
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
      vi.spyOn(component.closeCallback, 'emit');

      component.ngOnInit();

      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.cancelledOrFailed' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
      const billingForm = fixture.nativeElement.querySelector(
        'cx-checkout-billing-address-form'
      );
      expect(billingForm).toBeNull();
    });
  });
});
