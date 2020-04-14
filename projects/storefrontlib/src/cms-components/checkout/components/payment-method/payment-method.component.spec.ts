import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartService,
  Address,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  CheckoutService,
  GlobalMessageService,
  I18nTestingModule,
  PaymentDetails,
  RoutesConfig,
  RoutingConfigService,
  RoutingService,
  UserPaymentService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ICON_TYPE } from '../../../misc/index';
import {
  CheckoutStep,
  CheckoutStepType,
} from '../../model/checkout-step.model';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { PaymentMethodComponent } from './payment-method.component';
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

const mockCheckoutStep: CheckoutStep = {
  id: 'payment-method',
  name: 'Payment method',
  routeName: 'checkoutPaymentDetails',
  type: [CheckoutStepType.PAYMENT_DETAILS],
};

const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

class MockUserPaymentService {
  loadPaymentMethods(): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of();
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
}
class MockCheckoutService {
  clearCheckoutStep = createSpy();
}

class MockCheckoutPaymentService {
  setPaymentDetails = createSpy();
  createPaymentDetails = createSpy();
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
}
class MockCheckoutDeliveryService {
  getDeliveryAddress(): Observable<PaymentDetails> {
    return of(null);
  }
}

class MockRoutingService {
  go = createSpy();
}

class MockCheckoutConfigService {
  getCheckoutStep(): CheckoutStep {
    return mockCheckoutStep;
  }
  getNextCheckoutStepUrl(): string {
    return 'checkout/review-order';
  }
  getPreviousCheckoutStepUrl(): string {
    return 'checkout/delivery-mode';
  }
}

class MockGlobalMessageService {
  add = createSpy();
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}

class MockActiveCartService {
  isGuestCart(): boolean {
    return false;
  }
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

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-method'],
  },
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
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

fdescribe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;
  let mockUserPaymentService: UserPaymentService;
  let mockCheckoutPaymentService: CheckoutPaymentService;
  let mockRoutingService: RoutingService;
  // let mockRoutingConfigService: RoutingConfigService;
  // let mockActiveCartService: ActiveCartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        PaymentMethodComponent,
        MockPaymentFormComponent,
        CardComponent,
        // MockCardComponent,
        MockSpinnerComponent,
        MockCxIconComponent,
      ],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        { provide: CheckoutService, useClass: MockCheckoutService },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    }).compileComponents();

    mockUserPaymentService = TestBed.inject(UserPaymentService);
    mockCheckoutPaymentService = TestBed.inject(CheckoutPaymentService);
    mockRoutingService = TestBed.inject(RoutingService);
    // mockRoutingConfigService = TestBed.inject(RoutingConfigService);
    // mockActiveCartService = TestBed.inject(ActiveCartService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('component behavior', () => {
    it('should show loader during existing payment methods loading', () => {
      // arrange
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(true)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(mockCheckoutPaymentService, 'getPaymentDetails').and.returnValue(
        of(null)
      );

      // act
      component.ngOnInit();
      fixture.detectChanges();

      // assert
      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('cx-payment-form'))).toBeFalsy();
    });

    it('should select default payment method when nothing is selected', () => {
      // arrange
      const mockPayments = [
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
      ];
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of(mockPayments)
      );
      spyOn(mockCheckoutPaymentService, 'getPaymentDetails').and.returnValue(
        of(null)
      );

      // act
      component.ngOnInit();
      fixture.detectChanges();

      // assert
      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPayments[1]
      );
    });

    it('should show form to add new payment method, when there are no existing methods', () => {
      // arrange
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(mockCheckoutPaymentService, 'getPaymentDetails').and.returnValue(
        of(null)
      );

      // act
      component.ngOnInit();
      fixture.detectChanges();

      // assert
      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('cx-payment-form'))
      ).toBeTruthy();
    });

    it('should create and select new payment method and redirect', () => {
      // arrange
      const selectedPaymentMethod = new BehaviorSubject<PaymentDetails>(null);
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([])
      );
      spyOn(mockCheckoutPaymentService, 'getPaymentDetails').and.returnValue(
        selectedPaymentMethod.asObservable()
      );

      // act
      component.ngOnInit();
      fixture.detectChanges();
      component.setPaymentDetails({
        paymentDetails: mockPaymentDetails,
        billingAddress: mockAddress,
      });

      // assert
      expect(
        mockCheckoutPaymentService.createPaymentDetails
      ).toHaveBeenCalledWith({
        ...mockPaymentDetails,
        billingAddress: mockAddress,
      });
      selectedPaymentMethod.next(mockPaymentDetails);
      expect(mockRoutingService.go).toHaveBeenCalledWith(
        defaultStorefrontRoutesConfig.checkoutReviewOrder.paths[0]
      );
    });

    it('should show form for creating new method after clicking new payment method button', () => {
      // arrange
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([mockPaymentDetails])
      );
      spyOn(mockCheckoutPaymentService, 'getPaymentDetails').and.returnValue(
        of(null)
      );

      // act
      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('button'))
        .filter(
          (btn) => btn.nativeElement.innerText === 'paymentForm.addNewPayment'
        )[0]
        .nativeElement.click();
      fixture.detectChanges();

      // assert
      expect(fixture.debugElement.queryAll(By.css('cx-card')).length).toEqual(
        0
      );
      expect(fixture.debugElement.query(By.css('cx-spinner'))).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('cx-payment-form'))
      ).toBeTruthy();
    });

    it('should have enabled button when there is selected method', () => {
      // arrange
      const getContinueButton = () => {
        return fixture.debugElement
          .queryAll(By.css('button'))
          .filter(
            (btn) => btn.nativeElement.innerText === 'common.continue'
          )[0];
      };
      const selectedPaymentMethod = new BehaviorSubject<PaymentDetails>(null);
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([mockPaymentDetails])
      );
      spyOn(mockCheckoutPaymentService, 'getPaymentDetails').and.returnValue(
        selectedPaymentMethod.asObservable()
      );

      // act
      component.ngOnInit();
      fixture.detectChanges();

      // assert
      expect(getContinueButton().nativeElement.disabled).toBeTruthy();
      selectedPaymentMethod.next(mockPaymentDetails);
      fixture.detectChanges();
      expect(getContinueButton().nativeElement.disabled).toBeFalsy();
    });

    it('should display credit card info correctly', () => {
      const selectedPaymentMethod = {
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
            textDefaultPaymentMethod: 'Default payment method',
            textExpires: 'Expires',
            textUseThisPayment: 'Use this payment',
            textSelected: 'Selected',
          },
          selectedPaymentMethod
        )
      ).toEqual({
        title: 'Default payment method',
        textBold: 'Name',
        text: ['123456789', 'Expires'],
        img: 'CREDIT_CARD',
        actions: [{ name: 'Use this payment', event: 'send' }],
        header: 'Selected',
      });
    });
    // it('should after each payment method selection change that in backend', () => {});
    // it('should not try to load methods for guest checkout', () => {});
    // it('should close form on change payment button click and not do anything', () => {});
    // it('should go to previous step after clicking goPreview', () => {});
    // it('should show selected card, when there was previously selected method', () => {});
    // it('should show errors on wrong card information', () => {});
  });

  // it('should not get existing payment methods for guest user', (done) => {
  //   spyOn(mockUserPaymentService, 'loadPaymentMethods').and.stub();
  //   spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(of([]));
  //   spyOn(mockActiveCartService, 'isGuestCart').and.returnValue(true);
  //   component.ngOnInit();

  //   component.existingPaymentMethods$.subscribe(() => {
  //     expect(mockUserPaymentService.loadPaymentMethods).not.toHaveBeenCalled();
  //     done();
  //   });
  //   expect(component.isGuestCheckout).toBeTruthy();
  // });

  // it('should NOT automatically select default payment when there is a current selection', () => {
  //   component.selectedPayment = mockPaymentDetails;
  //   const mockDefaultPaymentDetails = {
  //     ...mockPaymentDetails,
  //     defaultPayment: true,
  //   };

  //   component
  //     .getCardContent(mockDefaultPaymentDetails)
  //     .subscribe(() => {
  //       expect(component.selectedPayment).toBeTruthy();
  //       expect(component.selectedPayment).not.toEqual(
  //         mockDefaultPaymentDetails
  //       );
  //       expect(component.selectedPayment).toEqual(mockPaymentDetails);
  //     })
  //     .unsubscribe();
  // });

  // describe('UI goPrevious button', () => {
  //   const getBackBtn = () =>
  //     fixture.debugElement
  //       .queryAll(By.css('.btn-action'))
  //       .find((el) => el.nativeElement.innerText === 'common.back');

  //   it('should call "goPrevious" function after being clicked', () => {
  //     spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
  //       of(false)
  //     );
  //     spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
  //       of(mockPaymentMethods)
  //     );

  //     fixture.detectChanges();
  //     spyOn(component, 'goPrevious');
  //     getBackBtn().nativeElement.click();
  //     expect(component.goPrevious).toHaveBeenCalled();
  //   });
  // });
});
