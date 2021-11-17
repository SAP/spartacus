import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Address,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  PaymentDetails,
  QueryState,
  UserPaymentService,
} from '@spartacus/core';
import { CardComponent, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
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

class MockUserPaymentService implements Partial<UserPaymentService> {
  loadPaymentMethods(): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of();
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  setPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return of();
  }
  createPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return of();
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
  paymentProcessSuccess() {}

  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return of();
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

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockActiveCartService implements Partial<ActiveCartService> {
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

describe('CheckoutPaymentMethodComponent', () => {
  let component: CheckoutPaymentMethodComponent;
  let fixture: ComponentFixture<CheckoutPaymentMethodComponent>;
  let mockUserPaymentService: UserPaymentService;
  let mockCheckoutPaymentService: CheckoutPaymentFacade;
  let mockActiveCartService: ActiveCartService;
  let mockGlobalMessageService: GlobalMessageService;
  let checkoutStepService: CheckoutStepService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
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
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: CheckoutPaymentFacade,
            useClass: MockCheckoutPaymentService,
          },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      }).compileComponents();

      mockUserPaymentService = TestBed.inject(UserPaymentService);
      mockCheckoutPaymentService = TestBed.inject(CheckoutPaymentFacade);
      mockActiveCartService = TestBed.inject(ActiveCartService);
      mockGlobalMessageService = TestBed.inject(GlobalMessageService);
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentMethodComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('component behavior', () => {
    it('should show loader during existing payment methods loading', () => {
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(true)
      );
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
      ];
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of(mockPayments)
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(of({ loading: false, error: false, data: undefined }));
      spyOn(mockCheckoutPaymentService, 'setPaymentDetails').and.callThrough();

      component.ngOnInit();
      fixture.detectChanges();

      expect(mockCheckoutPaymentService.setPaymentDetails).toHaveBeenCalledWith(
        mockPayments[1]
      );
    });

    it('should show form to add new payment method, when there are no existing methods', () => {
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
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
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
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
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
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
        title: '✓ DEFAULT',
        textBold: 'Name',
        text: ['123456789', 'Expires'],
        img: 'CREDIT_CARD',
        actions: [{ name: 'Use this payment', event: 'send' }],
        header: 'Selected',
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
      spyOn(mockCheckoutPaymentService, 'setPaymentDetails').and.callThrough();

      component.ngOnInit();
      fixture.detectChanges();
      fixture.debugElement
        .queryAll(By.css('cx-card'))[1]
        .query(By.css('.btn-link'))
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
      spyOn(mockActiveCartService, 'isGuestCart').and.returnValue(true);

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
      spyOn(mockCheckoutPaymentService, 'setPaymentDetails').and.callThrough();

      component.ngOnInit();
      fixture.detectChanges();

      expect(
        mockCheckoutPaymentService.setPaymentDetails
      ).not.toHaveBeenCalled();
    });

    it('should go to previous step after clicking back', () => {
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
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

    it('should show errors on wrong card information', () => {
      spyOn(mockUserPaymentService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserPaymentService, 'getPaymentMethods').and.returnValue(
        of([mockPaymentDetails])
      );
      spyOn(
        mockCheckoutPaymentService,
        'getPaymentDetailsState'
      ).and.returnValue(
        of({
          loading: false,
          error: false,
          data: {
            ...mockPaymentDetails,
            hasError: true,
            InvalidFieldCVV: 'cvv',
          },
        })
      );

      component.ngOnInit();
      fixture.detectChanges();

      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'paymentMethods.invalidField',
          params: { field: 'cvv' },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
