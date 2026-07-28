import { Component, Directive, Input, Type } from '@angular/core';
import {
  ComponentFixture,
    TestBed,
    } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  CxDatePipe,
  FeatureDirective,
  FeaturesConfig,
  GlobalMessageService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  PaymentDetails,
  QueryState,
  TranslatePipe,
  UserPaymentService,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/src/features-config/feature-toggles/testing';
import {
  CardComponent,
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from '../../../../../core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutPaymentFormComponent } from './checkout-payment-form/checkout-payment-form.component';
import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

const mockPaymentDetails: PaymentDetails = {
  id: 'mock payment id',
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: {
    code: 'Visa',
    name: 'Visa',
  },
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123',
};

const mockPayments: PaymentDetails[] = [
  {
    id: 'non default method',
    accountHolderName: 'Name',
    cardNumber: '123456789',
    cardType: {
      code: 'Visa',
      name: 'Visa',
    },
    expiryMonth: '01',
    expiryYear: '2022',
    cvn: '123',
  },
  {
    id: 'default payment method',
    accountHolderName: 'Name',
    cardNumber: '123456789',
    cardType: {
      code: 'Visa',
      name: 'Visa',
    },
    expiryMonth: '01',
    expiryYear: '2022',
    cvn: '123',
    defaultPayment: true,
  },
  mockPaymentDetails,
];

class MockUserPaymentService implements Partial<UserPaymentService> {
  loadPaymentMethods(): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return EMPTY;
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return EMPTY;
  }
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  setPaymentDetails = vi.fn().mockReturnValue(EMPTY);
  createPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return EMPTY;
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
  paymentProcessSuccess() {}

  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return EMPTY;
  }
}
class MockCheckoutDeliveryFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = vi.fn();
  back = vi.fn();
  getBackBntText(): string {
    return 'common.back';
  }
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-method'],
  },
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  isGuestCart(): Observable<boolean> {
    return of(false);
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

const mockAddress: Address = {
  id: 'mock address id',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

@Component({
  selector: 'cx-payment-form',
  template: '',
})
class MockPaymentFormComponent {
  @Input()
  paymentMethodsCount: number;
  @Input()
  setAsDefaultField: boolean;
  @Input()
  loading: boolean;
  @Input()
  paymentDetails?: PaymentDetails;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Directive({ selector: '[cxFocus]' })
class MockFocusDirective {
  @Input() cxFocus: FocusConfig | undefined;
}

describe('CheckoutPaymentMethodComponent', () => {
  let component: CheckoutPaymentMethodComponent;
  let fixture: ComponentFixture<CheckoutPaymentMethodComponent>;
  let mockUserPaymentService: UserPaymentService;
  let mockCheckoutPaymentService: CheckoutPaymentFacade;
  let mockActiveCartService: ActiveCartFacade;
  let checkoutStepService: CheckoutStepService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        CheckoutPaymentMethodComponent,
        CardComponent,
        IconComponent,
        SpinnerComponent,
      ],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '6.3' },
          },
        },
      ],
    })
      .overrideComponent(CheckoutPaymentMethodComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CheckoutPaymentFormComponent,
            SpinnerComponent,
            IconComponent,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockPaymentFormComponent,
            MockSpinnerComponent,
            MockCxIconComponent,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();

    mockUserPaymentService = TestBed.inject(UserPaymentService);
    mockCheckoutPaymentService = TestBed.inject(CheckoutPaymentFacade);
    mockActiveCartService = TestBed.inject(ActiveCartFacade);
    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentMethodComponent);
    component = fixture.componentInstance;

    vi.spyOn(component, 'selectPaymentMethod');
    vi.spyOn(component, 'savePaymentMethod');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('component behavior', () => {
    it('should show loader during existing payment methods loading', () => {
      component.isUpdating$ = of(true);
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([])
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('cx-payment-form'))).toBeFalsy();
    });

    it('should select default payment method when nothing is selected', () => {
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of(mockPayments)
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();

      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPayments[1]
      );
    });

    it('should show form to add new payment method, when there are no existing methods', () => {
      component.isUpdating$ = of(false);
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([])
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('cx-payment-form'))
      ).toBeTruthy();
    });

    it('should create and select new payment method and redirect', () => {
      const selectedPaymentMethod$ = new Subject<
        QueryState<PaymentDetails | undefined>
      >();
      vi.spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').mockReturnValue(
        of(false)
      );
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([])
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(selectedPaymentMethod$);
      vi.spyOn(
        mockCheckoutPaymentService,
        'createPaymentDetails'
      );

      component.ngOnInit();
      fixture.detectChanges();

      component.setPaymentDetails({
        paymentDetails: mockPaymentDetails,
        billingAddress: mockAddress,
      });

      expect(
        mockCheckoutPaymentService.createPaymentDetails
      ).toHaveBeenCalledWith({
        ...mockPaymentDetails,
        billingAddress: mockAddress,
      });
      selectedPaymentMethod$.next({
        loading: false,
        error: false,
        data: mockPaymentDetails,
      });
      expect(checkoutStepService.next).toHaveBeenCalledWith(
        <any>mockActivatedRoute
      );
    });

    it('should show form for creating new method after clicking new payment method button', () => {
      component.isUpdating$ = of(false);
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([mockPaymentDetails])
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('button'))
        .filter(
          (btn) => btn.nativeElement.textContent?.trim() === 'paymentForm.addNewPayment'
        )[0]
        .nativeElement.click();
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('cx-payment-form'))
      ).toBeTruthy();
    });

    it('should have enabled button when there is selected method', () => {
      const getContinueButton = () => {
        return fixture.debugElement
          .queryAll(By.css('button'))
          .filter(
            (btn) => btn.nativeElement.textContent?.trim() === 'common.continue'
          )[0];
      };
      const selectedPaymentMethod$ = new BehaviorSubject<
        QueryState<PaymentDetails | undefined>
      >({
        loading: false,
        error: false,
        data: undefined,
      });

      component.isUpdating$ = of(false);
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([mockPaymentDetails])
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(selectedPaymentMethod$);

      component.ngOnInit();
      fixture.detectChanges();

      expect(getContinueButton().nativeElement.disabled).toBeTruthy();
      selectedPaymentMethod$.next({
        loading: false,
        error: false,
        data: mockPaymentDetails,
      });
      fixture.detectChanges();
      expect(getContinueButton().nativeElement.disabled).toBeFalsy();
    });

    it('should not add select action for selected card', () => {
      const selectedPaymentMethod: PaymentDetails = {
        id: 'selected payment method',
        accountHolderName: 'Name',
        cardNumber: '123456789',
        cardType: {
          code: 'Visa',
          name: 'Visa',
        },
        expiryMonth: '01',
        expiryYear: '2022',
        cvn: '123',
        defaultPayment: true,
      };
      const card = component['createCard'](
        selectedPaymentMethod,
        {
          textDefaultPaymentMethod: '✓ DEFAULT',
          textExpires: 'Expires',
          textUseThisPayment: 'Use this payment',
          textSelected: 'Selected',
        },
        selectedPaymentMethod
      );
      expect(card.actions?.length).toBe(0);
    });

    it('should after each payment method selection change that in backend', () => {
      const mockPayments: PaymentDetails[] = [
        mockPaymentDetails,
        {
          id: 'default payment method',
          accountHolderName: 'Name',
          cardNumber: '123456789',
          cardType: {
            code: 'Visa',
            name: 'Visa',
          },
          expiryMonth: '01',
          expiryYear: '2022',
          cvn: '123',
          defaultPayment: true,
        },
      ];
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of(mockPayments)
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(
        of({ loading: false, error: false, data: mockPaymentDetails })
      );

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('cx-card'))[1]
        .query(By.css('.btn'))
        .nativeElement.click();

      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPayments[1]
      );
    });

    it('should not try to load methods for guest checkout', () => {
      vi.spyOn(mockUserPaymentService, 'loadPaymentMethods').mockImplementation(() => {});
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([])
      );
      vi.spyOn(mockActiveCartService, 'isGuestCart').mockReturnValue(of(true));

      component.ngOnInit();

      expect(mockUserPaymentService.loadPaymentMethods).not.toHaveBeenCalled();
    });

    it('should show selected card, when there was previously selected method', () => {
      const mockPayments: PaymentDetails[] = [
        mockPaymentDetails,
        {
          id: 'default payment method',
          accountHolderName: 'Name',
          cardNumber: '123456789',
          cardType: {
            code: 'Visa',
            name: 'Visa',
          },
          expiryMonth: '01',
          expiryYear: '2022',
          cvn: '123',
          defaultPayment: true,
        },
      ];
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of(mockPayments)
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(
        of({ loading: false, error: false, data: mockPaymentDetails })
      );

      component.ngOnInit();
      fixture.detectChanges();

      expect(
        mockCheckoutPaymentService.setPaymentDetails
      ).not.toHaveBeenCalled();
    });

    it('should go to previous step after clicking back', () => {
      component.isUpdating$ = of(false);
      vi.spyOn(mockUserPaymentService, 'getPaymentMethods').mockReturnValue(
        of([mockPaymentDetails])
      );
      vi.spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).mockReturnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('button'))
        .filter((btn) => btn.nativeElement.textContent?.trim() === 'common.back')[0]
        .nativeElement.click();
      fixture.detectChanges();

      expect(checkoutStepService.back).toHaveBeenCalledWith(
        <any>mockActivatedRoute
      );
    });

    it('should be able to select payment method', () => {
      fixture.detectChanges();

      component.selectPaymentMethod(mockPaymentDetails);

      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPaymentDetails
      );
      expect(component['savePaymentMethod']).toHaveBeenCalledWith(
        mockPaymentDetails
      );
      expect(globalMessageService.add).toHaveBeenCalled();
    });

    it('should NOT be able to select payment method if the selection is the same as the currently set payment details', () => {
      mockCheckoutPaymentService.getPaymentDetailsState =
        vi.fn().mockReturnValue(
          of({ loading: false, error: false, data: mockPayments[0] })
        );
      fixture.detectChanges();

      component.selectPaymentMethod(mockPayments[0]);

      expect(
        mockCheckoutPaymentService.setPaymentDetails
      ).not.toHaveBeenCalledWith(mockPayments[0]);
      expect(component['savePaymentMethod']).not.toHaveBeenCalledWith(
        mockPayments[0]
      );
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    describe('createCard().role', () => {
      let paymentMethod1: PaymentDetails;
      beforeEach(() => {
        paymentMethod1 = {
          id: 'selected payment method',
          accountHolderName: 'Name',
          cardNumber: '123456789',
          cardType: {
            code: 'Visa',
            name: 'Visa',
          },
          expiryMonth: '01',
          expiryYear: '2022',
          cvn: '123',
          defaultPayment: true,
        };
      });

      it('should be set to "application" for selected payment card', () => {
        expect(
          component['createCard'](
            paymentMethod1,
            {
              textDefaultPaymentMethod: '✓ DEFAULT',
              textExpires: 'Expires',
              textUseThisPayment: 'Use this payment',
              textSelected: 'Selected',
            },
            paymentMethod1
          ).role
        ).toEqual('application');
      });

      it('should be set to "button" for non selected payment cards', () => {
        expect(
          component['createCard'](
            paymentMethod1,
            {
              textDefaultPaymentMethod: '✓ DEFAULT',
              textExpires: 'Expires',
              textUseThisPayment: 'Use this payment',
              textSelected: 'Selected',
            },
            { ...paymentMethod1, id: 'newId' }
          ).role
        ).toEqual('button');
      });
    });

    describe('focusCardAfterSelecting', () => {
      it('should refocus the selected card after updating', async () => {
        vi.useFakeTimers();
        const card = document.createElement('cx-card');
        const selectButton = document.createElement('button');
        card.appendChild(selectButton);
        card.tabIndex = 0;
        document.body.appendChild(card);
        selectButton.focus();
        component['isUpdating$'] = of(false);
        vi.spyOn(card, 'focus');
        vi.spyOn(component['focusService'], 'findFirstFocusable').mockReturnValue(
          card
        );

        component.focusCardAfterSelecting();
        await vi.advanceTimersByTimeAsync(16); // Wait for requestAnimationFrame

        expect(card.focus).toHaveBeenCalled();
        vi.useRealTimers();
      });
    });
  });
});

describe('CheckoutPaymentMethodComponent - a11yImproveCheckoutFocus', () => {
  let fixture: ComponentFixture<CheckoutPaymentMethodComponent>;
  let component: CheckoutPaymentMethodComponent;
  let userPaymentService: UserPaymentService;
  let checkoutPaymentService: CheckoutPaymentFacade;

  const getAddNewPaymentButton = () =>
    fixture.debugElement.query(
      By.css('.cx-checkout-btns-top button.btn-secondary')
    );

  function configure(featureToggle: boolean) {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        CheckoutPaymentMethodComponent,
        CardComponent,
        IconComponent,
        SpinnerComponent,
      ],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockFeatureToggles({
          a11yImproveCheckoutFocus: featureToggle,
        }),
      ],
    })
      .overrideComponent(CheckoutPaymentMethodComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CheckoutPaymentFormComponent,
            SpinnerComponent,
            IconComponent,
            FocusDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockPaymentFormComponent,
            MockSpinnerComponent,
            MockCxIconComponent,
            MockFocusDirective,
          ],
        },
      })
      .compileComponents();

    userPaymentService = TestBed.inject(UserPaymentService);
    checkoutPaymentService = TestBed.inject(CheckoutPaymentFacade);

    vi.spyOn(userPaymentService, 'getPaymentMethods').mockReturnValue(
      of([mockPaymentDetails])
    );
    vi.spyOn(checkoutPaymentService, 'getPaymentDetailsState').mockReturnValue(
      of({ loading: false, error: false, data: undefined })
    );

    fixture = TestBed.createComponent(CheckoutPaymentMethodComponent);
    component = fixture.componentInstance;
    component.isUpdating$ = of(false);
    component.ngOnInit();
    fixture.detectChanges();
  }

  it('should bind autofocus to the "add new payment" button when the feature is enabled', () => {
    configure(true);

    const button = getAddNewPaymentButton();
    expect(button).toBeTruthy();

    const directive = button.injector.get(MockFocusDirective);
    expect(directive.cxFocus).toEqual(
      expect.objectContaining({ autofocus: true })
    );
  });

  it('should NOT bind autofocus to the "add new payment" button when the feature is disabled', () => {
    configure(false);

    const button = getAddNewPaymentButton();
    expect(button).toBeTruthy();

    expect(() => button.injector.get(MockFocusDirective)).toThrow();
  });
});
