import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, PaymentDetails } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  FeaturesConfig,
  FeaturesConfigModule,
  GlobalMessageService,
  I18nTestingModule,
  QueryState,
  UserPaymentService,
} from '@spartacus/core';
import { CardComponent, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';
import createSpy = jasmine.createSpy;

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
  setPaymentDetails = createSpy().and.returnValue(EMPTY);
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
  next = createSpy();
  back = createSpy();
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
  add = createSpy();
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

describe('CheckoutPaymentMethodComponent', () => {
  let component: CheckoutPaymentMethodComponent;
  let fixture: ComponentFixture<CheckoutPaymentMethodComponent>;
  let mockUserPaymentService: UserPaymentService;
  let mockCheckoutPaymentService: CheckoutPaymentFacade;
  let mockActiveCartService: ActiveCartFacade;
  let checkoutStepService: CheckoutStepService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FeaturesConfigModule],
        declarations: [
          CheckoutPaymentMethodComponent,
          MockPaymentFormComponent,
          CardComponent,
          MockSpinnerComponent,
          MockCxIconComponent,
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
      }).compileComponents();

      mockUserPaymentService = TestBed.inject(UserPaymentService);
      mockCheckoutPaymentService = TestBed.inject(CheckoutPaymentFacade);
      mockActiveCartService = TestBed.inject(ActiveCartFacade);
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
      globalMessageService = TestBed.inject(GlobalMessageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentMethodComponent);
    component = fixture.componentInstance;

    spyOn(component, 'selectPaymentMethod').and.callThrough();
    spyOn<any>(component, 'savePaymentMethod').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('component behavior', () => {
    it('should show loader during existing payment methods loading', () => {
      component.isUpdating$ = of(true);
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('cx-payment-form'))).toBeFalsy();
    });

    it('should select default payment method when nothing is selected', () => {
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of(mockPayments)
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();

      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPayments[1]
      );
    });

    it('should show form to add new payment method, when there are no existing methods', () => {
      component.isUpdating$ = of(false);
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(of({ loading: false, error: false, data: undefined }));

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
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(selectedPaymentMethod$);
      spyOn(
        mockCheckoutPaymentService,
        'createPaymentDetails'
      ).and.callThrough();

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
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([mockPaymentDetails])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('button'))
        .filter(
          (btn) => btn.nativeElement.innerText === 'paymentForm.addNewPayment'
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
            (btn) => btn.nativeElement.innerText === 'common.continue'
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
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([mockPaymentDetails])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(selectedPaymentMethod$);

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

    it('should display credit card info correctly', () => {
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

      expect(
        component['createCard'](
          selectedPaymentMethod,
          {
            textDefaultPaymentMethod: '✓ DEFAULT',
            textExpires: 'Expires',
            textUseThisPayment: 'Use this payment',
            textSelected: 'Selected',
          },
          selectedPaymentMethod
        )
      ).toEqual({
        role: 'region',
        title: '✓ DEFAULT',
        textBold: 'Name',
        text: ['123456789', 'Expires'],
        img: 'CREDIT_CARD',
        actions: [{ name: 'Use this payment', event: 'send' }],
        header: 'Selected',
        label: 'paymentCard.defaultPaymentLabel',
      });
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
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of(mockPayments)
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(
        of({ loading: false, error: false, data: mockPaymentDetails })
      );

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('cx-card'))[1]
        .query(By.css('.link'))
        .nativeElement.click();

      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPayments[1]
      );
    });

    it('should not try to load methods for guest checkout', () => {
      spyOn(mockUserPaymentService, 'loadPaymentMethods').and.stub();
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(mockActiveCartService, 'isGuestCart').and.returnValue(of(true));

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
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of(mockPayments)
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(
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
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([mockPaymentDetails])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(of({ loading: false, error: false, data: undefined }));

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('button'))
        .filter((btn) => btn.nativeElement.innerText === 'common.back')[0]
        .nativeElement.click();
      fixture.detectChanges();

      expect(checkoutStepService.back).toHaveBeenCalledWith(
        <any>mockActivatedRoute
      );
    });

    it('should be able to select payment method', () => {
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
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockPayments[0] })
        );

      component.selectPaymentMethod(mockPayments[0]);

      expect(
        mockCheckoutPaymentService.setPaymentDetails
      ).not.toHaveBeenCalledWith(mockPayments[0]);
      expect(component['savePaymentMethod']).not.toHaveBeenCalledWith(
        mockPayments[0]
      );
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });
});
