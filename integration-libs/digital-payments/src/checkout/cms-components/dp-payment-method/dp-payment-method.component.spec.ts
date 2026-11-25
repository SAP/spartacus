import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressService,
  CheckoutPaymentService,
} from '@spartacus/checkout/base/core';
import {
  CheckoutFiscalIdConfiguration,
  CheckoutFiscalIdFacade,
} from '@spartacus/checkout/base/root';
import { I18nTestingModule, PaymentDetails } from '@spartacus/core';
import { UserPaymentService } from '@spartacus/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { DpPaymentMethodComponent } from './dp-payment-method.component';
import { DpPaymentFormComponent } from './dp-payment-form/dp-payment-form.component';
import { DpPaymentCallbackComponent } from './dp-payment-callback/dp-payment-callback.component';

const payment: PaymentDetails = { id: 'card', cardType: { code: 'visa' } };

@Component({ selector: 'cx-dp-payment-form', template: '' })
class MockDpPaymentFormComponent {
  @Output() closeForm = new EventEmitter<void>();
}

@Component({ selector: 'cx-dp-payment-callback', template: '' })
class MockDpPaymentCallbackComponent {
  @Input() submitAdditionalFields?: () => Observable<boolean>;
  @Input() busy = false;
  @Output() submittingChange = new EventEmitter<boolean>();
  @Output() paymentDetailsAdded = new EventEmitter<PaymentDetails>();
  @Output() closeCallback = new EventEmitter<void>();
}

describe('DpPaymentMethodComponent', () => {
  let component: DpPaymentMethodComponent;
  let fixture: ComponentFixture<DpPaymentMethodComponent>;
  let configuration$: BehaviorSubject<CheckoutFiscalIdConfiguration>;
  let methods$: BehaviorSubject<PaymentDetails[]>;
  let selected$: BehaviorSubject<{
    loading: boolean;
    error: boolean;
    data: PaymentDetails | undefined;
  }>;
  let setFiscalId: ReturnType<typeof vi.fn>;
  let setPaymentDetails: ReturnType<typeof vi.fn>;
  let nextStep: ReturnType<typeof vi.fn>;
  let getCheckoutStep: ReturnType<typeof vi.fn>;
  let route: {
    snapshot: { queryParamMap: ReturnType<typeof convertToParamMap> };
  };

  beforeEach(async () => {
    configuration$ = new BehaviorSubject<CheckoutFiscalIdConfiguration>({
      enabled: true,
      required: true,
      sapCountry: 'PT',
    });
    methods$ = new BehaviorSubject<PaymentDetails[]>([payment]);
    selected$ = new BehaviorSubject({
      loading: false,
      error: false,
      data: payment as PaymentDetails | undefined,
    });
    setFiscalId = vi.fn().mockReturnValue(of(undefined));
    setPaymentDetails = vi.fn().mockReturnValue(EMPTY);
    nextStep = vi.fn();
    getCheckoutStep = vi.fn();
    route = { snapshot: { queryParamMap: convertToParamMap({}) } };

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        I18nTestingModule,
        DpPaymentMethodComponent,
      ],
      providers: [
        {
          provide: UserPaymentService,
          useValue: {
            loadPaymentMethods: vi.fn(),
            getPaymentMethods: () => methods$,
            getPaymentMethodsLoading: () => of(false),
          },
        },
        {
          provide: ActiveCartFacade,
          useValue: {
            isGuestCart: () => of(false),
            getActive: () => of({ code: 'cart' }),
          },
        },
        {
          provide: CheckoutStepService,
          useValue: {
            next: nextStep,
            back: vi.fn(),
            getBackBntText: () => 'common.back',
            getCheckoutStep,
          },
        },
        {
          provide: CheckoutDeliveryAddressService,
          useValue: {
            getDeliveryAddressState: () => of({ loading: false, error: false }),
          },
        },
        {
          provide: CheckoutPaymentService,
          useValue: {
            getPaymentDetailsState: () => selected$,
            setPaymentDetails,
          },
        },
        {
          provide: CheckoutFiscalIdFacade,
          useValue: { getConfiguration: () => configuration$, setFiscalId },
        },
        { provide: ActivatedRoute, useValue: route },
      ],
    })
      .overrideComponent(DpPaymentMethodComponent, {
        remove: {
          imports: [DpPaymentFormComponent, DpPaymentCallbackComponent],
        },
        add: {
          imports: [MockDpPaymentFormComponent, MockDpPaymentCallbackComponent],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(DpPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function enterFiscalId(value = '123456789'): void {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('#fiscalIdInput');
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function continueButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button.btn-primary');
  }

  it('renders Fiscal ID as a separate module before the existing-card payment section', () => {
    expect(
      fixture.nativeElement.querySelector(
        'cx-fiscal-id-form + .cx-payment-options'
      )
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeNull();
    expect(continueButton()).toBeTruthy();
  });

  it('keeps required empty Fiscal ID on the existing-card page', () => {
    continueButton().click();
    fixture.detectChanges();
    expect(component.fiscalIdForm?.control.touched).toBe(true);
    expect(setFiscalId).not.toHaveBeenCalled();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeNull();
  });

  it('waits for Fiscal ID binding and cart synchronization before navigating, ignoring duplicate clicks', () => {
    const saved$ = new Subject<void>();
    setFiscalId.mockReturnValue(saved$);
    enterFiscalId();
    continueButton().click();
    component.next();
    fixture.detectChanges();
    expect(setFiscalId).toHaveBeenCalledTimes(1);
    expect(setFiscalId).toHaveBeenCalledWith('123456789');
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeNull();
    expect(fixture.nativeElement.querySelector('#fiscalIdInput').readOnly).toBe(
      true
    );
    saved$.next();
    saved$.complete();
    fixture.detectChanges();
    expect(nextStep).toHaveBeenCalledTimes(1);
    expect(nextStep).toHaveBeenCalledWith(route);
  });

  it('preserves the value and shows the localized error when binding fails, allowing retry', () => {
    setFiscalId.mockReturnValue(
      throwError(() => ({
        details: [
          {
            type: 'FiscalIdValidationError',
            errorCode: 'fiscal.id.invalid.format',
          },
        ],
      }))
    );
    enterFiscalId();
    continueButton().click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeNull();
    expect(fixture.nativeElement.querySelector('#fiscalIdInput').value).toBe(
      '123456789'
    );
    expect(component.fiscalIdForm?.control.invalid).toBe(true);
    expect(component.fiscalIdForm?.control.errors).toEqual({
      invalidFormat: { country: 'PT' },
    });
    setFiscalId.mockReturnValue(of(undefined));
    continueButton().click();
    fixture.detectChanges();
    expect(nextStep).toHaveBeenCalledTimes(1);
    expect(nextStep).toHaveBeenCalledWith(route);
  });

  it('allows optional empty Fiscal ID to proceed', () => {
    configuration$.next({ enabled: true, required: false });
    fixture.detectChanges();
    continueButton().click();
    fixture.detectChanges();
    expect(nextStep).toHaveBeenCalledTimes(1);
    expect(nextStep).toHaveBeenCalledWith(route);
  });

  it('retains automatic registration when Fiscal ID is disabled', () => {
    methods$.next([]);
    configuration$.next({ enabled: false, required: false });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#fiscalIdInput')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeTruthy();
  });

  it('does not duplicate the B2B Fiscal ID field on Payment', () => {
    getCheckoutStep.mockReturnValue({ id: 'paymentType' });
    methods$.next([]);
    fixture.destroy();
    fixture = TestBed.createComponent(DpPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('cx-fiscal-id-form')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeTruthy();
  });

  it('does not navigate when selecting an existing card or auto-selecting a default card', () => {
    selected$.next({ loading: false, error: false, data: undefined });
    component.selectPaymentMethod(payment);
    expect(setPaymentDetails).toHaveBeenCalledWith(payment);
    expect(nextStep).not.toHaveBeenCalled();
    component.selectDefaultPaymentMethod(
      [
        {
          payment: { ...payment, defaultPayment: true },
          expiryTranslation: '',
        },
      ],
      undefined
    );
    expect(nextStep).not.toHaveBeenCalled();
  });

  it('submits Fiscal ID on existing-card Continue before navigating', () => {
    methods$.next([payment]);
    selected$.next({ loading: false, error: false, data: payment });
    fixture.detectChanges();
    enterFiscalId();
    continueButton().click();
    expect(setFiscalId).toHaveBeenCalledWith('123456789');
    expect(nextStep).toHaveBeenCalledTimes(1);
    expect(nextStep).toHaveBeenCalledWith(route);
  });

  it('blocks existing-card Continue when Fiscal ID is invalid', () => {
    methods$.next([payment]);
    selected$.next({ loading: false, error: false, data: payment });
    fixture.detectChanges();
    continueButton().click();
    expect(nextStep).not.toHaveBeenCalled();
  });

  it('automatically starts registration without a new Continue or Fiscal ID input when there are no cards', () => {
    methods$.next([]);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('cx-fiscal-id-form')).toBeNull();
    expect(continueButton()).toBeNull();
    expect(setFiscalId).not.toHaveBeenCalled();
  });

  it('starts registration directly when Add New Payment is clicked', () => {
    fixture.nativeElement.querySelector('button.btn-secondary').click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('cx-dp-payment-form')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('cx-fiscal-id-form')).toBeNull();
    expect(continueButton()).toBeNull();
    expect(setFiscalId).not.toHaveBeenCalled();
  });

  describe('guest checkout', () => {
    let host: HTMLElement;

    beforeEach(() => {
      fixture.destroy();
      vi.spyOn(TestBed.inject(ActiveCartFacade), 'isGuestCart').mockReturnValue(
        of(true)
      );
      vi.spyOn(TestBed.inject(ActiveCartFacade), 'getActive').mockReturnValue(
        of({
          code: 'cart',
          sapCustomerFiscalId: {
            sapFiscalIdEntries: [{ sapValue: '123456789' }],
          },
        })
      );
      methods$.next([]);
      fixture = TestBed.createComponent(DpPaymentMethodComponent);
      component = fixture.componentInstance;
      host = fixture.nativeElement;
    });

    it('lets a guest edit Fiscal ID using the cart payment without registering a new card', () => {
      selected$.next({ loading: true, error: false, data: undefined });
      fixture.detectChanges();
      expect(host.querySelector('cx-dp-payment-form')).toBeNull();

      selected$.next({
        loading: false,
        error: false,
        data: { ...payment, cardNumber: '********1234' },
      });
      fixture.detectChanges();
      expect(host.querySelector('cx-dp-payment-form')).toBeNull();
      expect(host.textContent).toContain('********1234');
      expect(
        host.querySelector<HTMLInputElement>('#fiscalIdInput')?.value
      ).toBe('123456789');

      const saved$ = new Subject<void>();
      setFiscalId.mockReturnValue(saved$);
      enterFiscalId('987654321');
      continueButton().click();
      fixture.detectChanges();
      expect(setFiscalId).toHaveBeenCalledTimes(1);
      expect(setFiscalId).toHaveBeenCalledWith('987654321');
      expect(nextStep).not.toHaveBeenCalled();
      expect(setPaymentDetails).not.toHaveBeenCalled();
      expect(host.querySelector('cx-dp-payment-form')).toBeNull();

      saved$.next();
      saved$.complete();
      fixture.detectChanges();
      expect(nextStep).toHaveBeenCalledTimes(1);
      expect(nextStep).toHaveBeenCalledWith(route);
      expect(setPaymentDetails).not.toHaveBeenCalled();
    });

    it.each([undefined, {}])(
      'starts card registration when the cart has no payment ID (%j)',
      (paymentDetails) => {
        selected$.next({ loading: false, error: false, data: paymentDetails });
        fixture.detectChanges();
        expect(host.querySelector('cx-dp-payment-form')).toBeTruthy();
        expect(host.querySelector('cx-fiscal-id-form')).toBeNull();
        expect(continueButton()).toBeNull();
      }
    );

    it('allows a guest with a cart payment to register a different card', () => {
      fixture.detectChanges();
      expect(host.querySelector('cx-dp-payment-form')).toBeNull();
      host.querySelector<HTMLButtonElement>('button.btn-secondary')?.click();
      fixture.detectChanges();
      expect(host.querySelector('cx-dp-payment-form')).toBeTruthy();
      expect(host.querySelector('cx-fiscal-id-form')).toBeNull();
      expect(continueButton()).toBeNull();
    });
  });

  it('detects the callback and navigates once after binding its payment details without submitting Fiscal ID twice', () => {
    route.snapshot.queryParamMap = convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    });
    expect(component.isDpCallback()).toBe(true);
    component.paymentDetailsAdded(payment);
    expect(setPaymentDetails).toHaveBeenCalledWith(payment);
    expect(nextStep).toHaveBeenCalledTimes(1);
    expect(nextStep).toHaveBeenCalledWith(route);
    expect(setFiscalId).not.toHaveBeenCalled();
  });

  it('does not navigate if binding the callback payment fails', () => {
    setPaymentDetails.mockReturnValue(
      throwError(() => new Error('binding failed'))
    );
    component.paymentDetailsAdded(payment);
    expect(nextStep).not.toHaveBeenCalled();
  });

  it('connects callback validation to Fiscal ID and locks the input until card creation finishes', () => {
    fixture.destroy();
    methods$.next([]);
    route.snapshot.queryParamMap = convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    });
    fixture = TestBed.createComponent(DpPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const callback: MockDpPaymentCallbackComponent = fixture.debugElement.query(
      By.directive(MockDpPaymentCallbackComponent)
    ).componentInstance;
    expect(callback.submitAdditionalFields).toBe(component.submitFiscalId);
    callback.submittingChange.emit(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#fiscalIdInput').readOnly).toBe(
      true
    );
    callback.submittingChange.emit(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#fiscalIdInput').readOnly).toBe(
      false
    );
    callback.paymentDetailsAdded.emit(payment);
    expect(nextStep).toHaveBeenCalledTimes(1);
    expect(nextStep).toHaveBeenCalledWith(route);
  });

  it('hides the callback after cancellation', () => {
    component.showCallbackScreen = true;
    component.hideCallbackScreen();
    expect(component.showCallbackScreen).toBe(false);
  });
});
