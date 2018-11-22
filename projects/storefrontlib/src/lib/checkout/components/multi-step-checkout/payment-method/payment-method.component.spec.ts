import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

import createSpy = jasmine.createSpy;

import { CartDataService } from '../../../../cart/facade/cart-data.service';
import { UserService } from '../../../../user/facade/user.service';

import { PaymentMethodComponent } from './payment-method.component';

const mockPaymentMethod1 = {
  accountHolderName: 'Name 1',
  cardNumber: '1111111111',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '3000',
  cvn: '111'
};

const mockPaymentMethod2 = {
  accountHolderName: 'Name 2',
  cardNumber: '2222222222',
  cardType: 'Visa',
  expiryMonth: '02',
  expiryYear: '3000',
  cvn: '222'
};

const mockPaymentMethod3 = {
  accountHolderName: 'Name 2',
  cardNumber: '2222222222',
  cardType: 'Visa',
  expiryMonth: '02',
  expiryYear: '3000',
};

const mockPaymentMethods = [mockPaymentMethod1, mockPaymentMethod2];

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
  let mockUserService: any;

  beforeEach(async(() => {
    mockUserService = {
      paymentMethods$: new BehaviorSubject(null),
      paymentMethodsLoading$: new BehaviorSubject(null),
      loadPaymentMethods: createSpy()
    };
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
        { provide: UserService, useValue: mockUserService },
        { provide: CartDataService, useValue: mockCartDataService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;

    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing payment methods if they do not exist', done => {
    mockUserService.paymentMethods$.next([]);
    component.ngOnInit();
    component.existingPaymentMethods$.subscribe(() => {
      expect(mockUserService.loadPaymentMethods).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get existing payment methods if they exist', () => {
    mockUserService.paymentMethods$.next(mockPaymentMethods);
    component.ngOnInit();
    let paymentMethods;
    component.existingPaymentMethods$.subscribe(data => {
      paymentMethods = data;
    });
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

  it('should call setCvn()', () => {
    component.paymentMethodSelected(mockPaymentMethod3, 1);
    component.setCvn('900');

    expect(component.selectedPayment.cvn).toEqual('900');
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-primary'))
        .find(el => el.nativeElement.innerText === 'Continue');

    it('should be disabled when no payment method is selected', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      component.selectedPayment = null;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when payment method is selected', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      component.selectedPayment = mockPaymentMethod1;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
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
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      fixture.detectChanges();
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI cards with payment methods', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('cx-card'));

    it('should represent all existng payment methods', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng payment methods', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next([]);
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng payment methods are loading', () => {
      mockUserService.paymentMethodsLoading$.next(true);
      mockUserService.paymentMethods$.next([]);
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
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      fixture.detectChanges();
      getAddNewPaymentBtn().nativeElement.click();

      fixture.detectChanges();
      expect(getNewPaymentForm()).toBeTruthy();
    });

    it('should render on init if there are no existing payment methods', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next([]);
      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing payment methods', () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeFalsy();
    });

    it('should not render when existing payment methods are loading', () => {
      mockUserService.paymentMethodsLoading$.next(true);
      mockUserService.paymentMethods$.next([]);
      fixture.detectChanges();

      expect(getNewPaymentForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing payment methods are loading', () => {
      mockUserService.paymentMethodsLoading$.next(true);
      mockUserService.paymentMethods$.next([]);
      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();

      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });

  describe('UI CVN box for saved cards', () => {
    const getCvnBox = () => fixture.debugElement.query(By.css('#cVVNumber'));
    const getContinueBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-primary'))
        .find(el => el.nativeElement.innerText === 'Continue');

    it('should render only when existing payment methods has been selected', async () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      expect(getCvnBox()).toBeFalsy();

      component.paymentMethodSelected(mockPaymentMethod1, 1);
      fixture.detectChanges();
      expect(getCvnBox()).toBeTruthy();
    });

    it('should change the cvn on input change', async () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      component.paymentMethodSelected(mockPaymentMethod1, 1);
      fixture.detectChanges();

      const inputElement = getCvnBox().nativeElement;
      inputElement.value = '444';
      inputElement.dispatchEvent(new Event('change'));

      expect(component.selectedPayment.cvn).toEqual('444');
    });

    it('should disable the next button if CVN is not present', async () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      component.paymentMethodSelected(mockPaymentMethod3, 1);
      component.setCvn(null);

      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should enable the next button when CVN is present', async () => {
      mockUserService.paymentMethodsLoading$.next(false);
      mockUserService.paymentMethods$.next(mockPaymentMethods);
      component.paymentMethodSelected(mockPaymentMethod3, 1);
      component.setCvn('123');

      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });
  });
});
