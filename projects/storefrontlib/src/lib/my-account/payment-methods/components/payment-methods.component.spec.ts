import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '@spartacus/core';

import { PaymentMethodsComponent } from './payment-methods.component';
import { Component, DebugElement } from '@angular/core';
import { CardComponent } from './../../../ui/components/card/card.component';

@Component({
  template: '<div>Spinner</div>',
  selector: 'cx-spinner'
})
class MockCxSpinnerComponent {}

const mockPayment = {
  defaultPayment: true,
  accountHolderName: 'John Doe',
  cardNumber: '4111 1111 1111 1111',
  expiryMonth: '11',
  expiryYear: '2020',
  id: '2'
};

describe('PaymentMethodsComponent', () => {
  let component: PaymentMethodsComponent;
  let fixture: ComponentFixture<PaymentMethodsComponent>;
  let mockUserService;
  let el: DebugElement;
  const loading = new BehaviorSubject<boolean>(true);
  const paymentMethods = new BehaviorSubject<any>([mockPayment]);
  const user = new BehaviorSubject<any>({ uid: 'userId' });

  beforeEach(async(() => {
    mockUserService = {
      paymentMethodsLoading$: loading.asObservable(),
      paymentMethods$: paymentMethods.asObservable(),
      loadPaymentMethods: jasmine.createSpy(),
      deleteUserPaymentMethod: jasmine.createSpy(),
      setPaymentMethodAsDefault: jasmine.createSpy(),
      user$: user.asObservable()
    };

    TestBed.configureTestingModule({
      declarations: [
        PaymentMethodsComponent,
        MockCxSpinnerComponent,
        CardComponent
      ],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show basic information', () => {
    function getTitle(elem: DebugElement) {
      return elem.query(By.css('.cx-payment-methods__header')).nativeElement
        .textContent;
    }
    function getBodyMessage(elem: DebugElement) {
      return elem.query(By.css('.cx-payment-methods__msg')).nativeElement
        .textContent;
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getTitle(el)).toContain('Payment methods');
    expect(getBodyMessage(el)).toContain(
      'New payment methods are added during checkout.'
    );
  });

  it('should show spinner if payment methods are loading', () => {
    function getSpinner(elem: DebugElement) {
      return elem.query(By.css('cx-spinner'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getSpinner(el)).toBeTruthy();
  });

  it('should show payment methods after loading', () => {
    function getCard(elem: DebugElement) {
      return elem.query(By.css('cx-card'));
    }
    component.ngOnInit();
    loading.next(false);
    fixture.detectChanges();
    expect(getCard(el)).toBeTruthy();
  });

  it('should render all payment methods', () => {
    function getCards(elem: DebugElement) {
      return elem.queryAll(By.css('cx-card'));
    }
    component.ngOnInit();
    loading.next(false);
    paymentMethods.next([mockPayment, mockPayment]);
    fixture.detectChanges();
    expect(getCards(el).length).toEqual(2);
  });

  it('should render correct content in card', () => {
    function getCardHeader(elem: DebugElement) {
      return elem.query(By.css('cx-card .card-header')).nativeElement
        .textContent;
    }
    function getTextBold(elem: DebugElement) {
      return elem.query(By.css('cx-card .card__label--bold')).nativeElement
        .textContent;
    }
    function getCardNumber(elem: DebugElement) {
      return elem.queryAll(By.css('cx-card .card__label'))[0].nativeElement
        .textContent;
    }
    function getExpiration(elem: DebugElement) {
      return elem.queryAll(By.css('cx-card .card__label'))[1].nativeElement
        .textContent;
    }
    component.ngOnInit();
    loading.next(false);
    paymentMethods.next([
      mockPayment,
      { ...mockPayment, defaultPayment: false }
    ]);
    fixture.detectChanges();
    expect(getCardHeader(el)).toContain('DEFAULT');
    expect(getTextBold(el)).toContain(mockPayment.accountHolderName);
    expect(getCardNumber(el)).toContain(mockPayment.cardNumber);
    expect(getExpiration(el)).toContain(
      `Expires: ${mockPayment.expiryMonth}/${mockPayment.expiryYear}`
    );
  });

  it('should show confirm on delete', () => {
    function getDeleteMsg(elem: DebugElement) {
      return elem.query(By.css('cx-card .cx-card-body__delete-msg'))
        .nativeElement.textContent;
    }
    function getDeleteButton(elem: DebugElement) {
      return elem.query(By.css('cx-card .card-link')).nativeElement;
    }
    function getCancelButton(elem: DebugElement) {
      return elem.query(By.css('cx-card .btn-secondary'));
    }
    component.ngOnInit();
    loading.next(false);
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    expect(getDeleteMsg(el)).toContain(
      'Are you sure you want to delete this payment method?'
    );
    getCancelButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(getCancelButton(el)).toBeFalsy();
  });

  it('should successfully delete card', () => {
    function getDeleteButton(elem: DebugElement) {
      return elem.query(By.css('cx-card .card-link')).nativeElement;
    }
    function getConfirmButton(elem: DebugElement) {
      return elem.query(By.css('cx-card .btn-primary'));
    }
    component.ngOnInit();
    loading.next(false);
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    getConfirmButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(mockUserService.deleteUserPaymentMethod).toHaveBeenCalledWith(
      'userId',
      mockPayment.id
    );
  });

  it('should successfully set card as default', () => {
    function getSetDefaultButton(elem: DebugElement) {
      return elem.queryAll(By.css('cx-card .card-link'))[1].nativeElement;
    }
    component.ngOnInit();
    loading.next(false);
    paymentMethods.next([
      mockPayment,
      { ...mockPayment, defaultPayment: false }
    ]);
    fixture.detectChanges();
    getSetDefaultButton(el).click();
    expect(mockUserService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
      'userId',
      mockPayment.id
    );
  });
});
