import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PaymentDetails } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { CartDataService } from '../../../../cart/facade/cart-data.service';
import { UserService } from '@spartacus/core';

import { PaymentMethodComponent } from './payment-method.component';

class MockUserService {
  loadPaymentMethods(_userId: string): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of();
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
}

const mockPaymentMethod1: PaymentDetails = {
  accountHolderName: 'Name 1',
  cardNumber: '1111111111',
  cardType: { code: 'Visa', name: 'Visa' },
  expiryMonth: '01',
  expiryYear: '3000',
  cvn: '111'
};

const mockPaymentMethod2: PaymentDetails = {
  accountHolderName: 'Name 2',
  cardNumber: '2222222222',
  cardType: { code: 'Visa', name: 'Visa' },
  expiryMonth: '02',
  expiryYear: '3000',
  cvn: '222'
};

const mockPaymentMethods: PaymentDetails[] = [
  mockPaymentMethod1,
  mockPaymentMethod2
];

@Component({
  selector: 'cx-payment-form',
  template: ''
})
class MockPaymentFormComponent {}

@Component({
  selector: 'cx-spinner',
  template: ''
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-card',
  template: ''
})
class MockCardComponent {
  @Input()
  border;
  @Input()
  content;
}

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    const mockCartDataService = {
      userId: 'testUser'
    };

    TestBed.configureTestingModule({
      declarations: [
        PaymentMethodComponent,
        MockPaymentFormComponent,
        MockCardComponent,
        MockSpinnerComponent
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: CartDataService, useValue: mockCartDataService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);

    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing payment methods if they do not exist', done => {
    spyOn(userService, 'loadPaymentMethods').and.stub();
    spyOn(userService, 'getPaymentMethods').and.returnValue(of([]));
    component.ngOnInit();
    component.existingPaymentMethods$.subscribe(() => {
      expect(userService.loadPaymentMethods).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get existing payment methods if they exist', () => {
    spyOn(userService, 'getPaymentMethods').and.returnValue(
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
    const card = component.getCardContent(mockPaymentMethod1);
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('Name 1');
    expect(card.text).toEqual(['1111111111', 'Expires: 01/3000']);
  });

  it('should call paymentMethodSelected(paymentDetails, index)', () => {
    const card1 = { title: 'test card 1' };
    const card2 = { title: 'test card 2' };
    const card3 = { title: 'test card 3' };
    component.cards.push(card1, card2, card3);
    component.paymentMethodSelected(mockPaymentMethod1, 1);

    expect(component.selectedPayment).toEqual(mockPaymentMethod1);
    expect(component.cards[0].header).toEqual('');
    expect(component.cards[1].header).toEqual('SELECTED');
    expect(component.cards[2].header).toEqual('');
  });

  it('should call next() to submit request', () => {
    component.selectedPayment = mockPaymentMethod1;
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: mockPaymentMethod1,
      newPayment: false
    });
  });

  it('should call addNewPaymentMethod()', () => {
    component.addNewPaymentMethod(mockPaymentMethod1);
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: mockPaymentMethod1,
      newPayment: true
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
    component.back();
    expect(component.backStep.emit).toHaveBeenCalled();
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-primary'))
        .find(el => el.nativeElement.innerText === 'Continue');

    it('should be disabled when no payment method is selected', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      component.selectedPayment = null;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when payment method is selected', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      component.selectedPayment = mockPaymentMethod1;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      component.selectedPayment = mockPaymentMethod1;
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
        .find(el => el.nativeElement.innerText === 'Back');

    it('should call "back" function after being clicked', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
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
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng payment methods', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng payment methods are loading', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new payment method form', () => {
    const getAddNewPaymentBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'Add New Payment');
    const getNewPaymentForm = () =>
      fixture.debugElement.query(By.css('cx-payment-form'));

    it('should render after user clicks "add new payment method" button', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      getAddNewPaymentBtn().nativeElement.click();

      fixture.detectChanges();
      expect(getNewPaymentForm()).toBeTruthy();
    });

    it('should render on init if there are no existing payment methods', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing payment methods', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeFalsy();
    });

    it('should not render when existing payment methods are loading', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(true));
      spyOn(userService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing payment methods are loading', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(true));
      spyOn(userService, 'getPaymentMethods').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should NOT render when the payment method is loaded', () => {
      spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
      spyOn(userService, 'getPaymentMethods').and.returnValue(
        of(mockPaymentMethods)
      );

      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
