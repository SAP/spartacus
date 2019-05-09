import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import {
  Address,
  CartDataService,
  CheckoutService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  PaymentDetails,
  UserService,
} from '@spartacus/core';
import { Card } from '../../../../shared/components/card/card.component';
import { PaymentMethodComponent } from './payment-method.component';

import createSpy = jasmine.createSpy;
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutStep,
  CheckoutStepType,
} from '../../model/checkout-step.model';
import { CheckoutConfigService } from '../../checkout-config.service';

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
  url: '/checkout/payment-method',
  type: [CheckoutStepType.paymentDetails],
};

class MockUserService {
  loadPaymentMethods(_userId: string): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of();
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
}
class MockCheckoutService {
  setPaymentDetails = createSpy();
  clearCheckoutStep = createSpy();
  createPaymentDetails = createSpy();
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
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
    return '';
  }
  getPreviousCheckoutStepUrl(): string {
    return '';
  }
}

class MockGlobalMessageService {
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

const mockPaymentMethods: PaymentDetails[] = [
  mockPaymentDetails,
  mockPaymentDetails,
];

const mockCartDataService = {
  userId: 'testUser',
};

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-method'],
  },
};

const mockStepUrl = 'test url';

@Component({
  selector: 'cx-payment-form',
  template: '',
})
class MockPaymentFormComponent {
  @Input()
  paymentMethodsCount: number;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  border: boolean;
  @Input()
  fitToContainer: boolean;
  @Input()
  content: Card;
}

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;
  let mockUserService: UserService;
  let mockCheckoutService: CheckoutService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        PaymentMethodComponent,
        MockPaymentFormComponent,
        MockCardComponent,
        MockSpinnerComponent,
      ],
      providers: [
        { provide: CartDataService, useValue: mockCartDataService },
        { provide: UserService, useClass: MockUserService },
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockUserService = TestBed.get(UserService);
    mockCheckoutService = TestBed.get(CheckoutService);
    mockRoutingService = TestBed.get(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call addPaymentInfo() with new created payment info', () => {
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({
      payment: mockPaymentDetails,
      newPayment: true,
      billingAddress: null,
    });
    expect(mockCheckoutService.createPaymentDetails).toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('should call ngOnInit to get existing payment methods if they do not exist', done => {
    spyOn(mockUserService, 'loadPaymentMethods').and.stub();
    spyOn(mockUserService, 'getPaymentMethods').and.returnValue(of([]));
    component.ngOnInit();

    component.existingPaymentMethods$.subscribe(() => {
      expect(mockUserService.loadPaymentMethods).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get existing payment methods if they exist', () => {
    spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
      of(mockPaymentMethods)
    );
    component.ngOnInit();
    let paymentMethods: PaymentDetails[];
    component.existingPaymentMethods$
      .subscribe(data => {
        paymentMethods = data;
      })
      .unsubscribe();
    expect(paymentMethods).toBe(mockPaymentMethods);
    expect(component.cards.length).toEqual(2);
  });

  it('should call getCardContent() to get payment method card data', () => {
    const card = component.getCardContent(mockPaymentDetails);
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('Name');
    expect(card.text).toEqual(['123456789', 'Expires: 01/2022']);
  });

  it('should call paymentMethodSelected(paymentDetails, index)', () => {
    const card1: Card = { title: 'test card 1' };
    const card2: Card = { title: 'test card 2' };
    const card3: Card = { title: 'test card 3' };
    component.cards.push(card1, card2, card3);
    component.paymentMethodSelected(mockPaymentDetails, 1);

    expect(component.selectedPayment).toEqual(mockPaymentDetails);
    expect(component.cards[0].header).toEqual('');
    expect(component.cards[1].header).toEqual('SELECTED');
    expect(component.cards[2].header).toEqual('');
  });

  it('should call next() to submit request', () => {
    spyOn(component, 'addPaymentInfo');
    component.selectedPayment = mockPaymentDetails;
    component.next();

    expect(component.addPaymentInfo).toHaveBeenCalledWith({
      payment: mockPaymentDetails,
      newPayment: false,
    });
  });

  it('should call addNewPaymentMethod()', () => {
    spyOn(component, 'addPaymentInfo');
    component.addNewPaymentMethod({
      paymentDetails: mockPaymentDetails,
      billingAddress: null,
    });
    expect(component.addPaymentInfo).toHaveBeenCalledWith({
      payment: mockPaymentDetails,
      billingAddress: null,
      newPayment: true,
    });
  });

  it('should call showNewPaymentForm()', () => {
    component.showNewPaymentForm();
    expect(component.newPaymentFormManuallyOpened).toEqual(true);
  });

  it('should call hideNewPaymentForm()', () => {
    component.hideNewPaymentForm();
    expect(component.newPaymentFormManuallyOpened).toEqual(false);
  });

  it('should call back()', () => {
    component.checkoutStepUrlPrevious = mockStepUrl;
    component.back();

    expect(mockRoutingService.go).toHaveBeenCalledWith(mockStepUrl);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-primary'))
        .find(el => el.nativeElement.innerText === 'common.continue');

    it('should be enabled when payment method is selected', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      component.selectedPayment = mockPaymentDetails;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      component.selectedPayment = mockPaymentDetails;
      fixture.detectChanges();
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'common.back');

    it('should call "back" function after being clicked', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI cards with payment methods', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('cx-card'));

    it('should represent all existng payment methods', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng payment methods', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng payment methods are loading', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new payment method form', () => {
    const getAddNewPaymentBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'paymentForm.addNewPayment');
    const getNewPaymentForm = () =>
      fixture.debugElement.query(By.css('cx-payment-form'));

    it('should render after user clicks "add new payment method" button', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      getAddNewPaymentBtn().nativeElement.click();

      fixture.detectChanges();
      expect(getNewPaymentForm()).toBeTruthy();
    });

    it('should render on init if there are no existing payment methods', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing payment methods', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeFalsy();
    });

    it('should not render when existing payment methods are loading', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(true)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing payment methods are loading', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(true)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should NOT render when the payment method is loaded', () => {
      spyOn(mockUserService, 'getPaymentMethodsLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
