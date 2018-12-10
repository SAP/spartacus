import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { PaymentDetails, User } from '@spartacus/core';

import { Observable, of } from 'rxjs';

import { UserService } from '../../../user/facade/user.service';
import { CardComponent } from './../../../ui/components/card/card.component';

import { PaymentMethodsComponent } from './payment-methods.component';

@Component({
  template: '<div>Spinner</div>',
  selector: 'cx-spinner'
})
class MockCxSpinnerComponent {}

const mockPayment: PaymentDetails = {
  defaultPayment: true,
  accountHolderName: 'John Doe',
  cardNumber: '4111 1111 1111 1111',
  expiryMonth: '11',
  expiryYear: '2020',
  id: '2'
};

class MockUserService {
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of([mockPayment]);
  }
  loadPaymentMethods(_userId: string): void {}
  deleteUserPaymentMethod(_userId: string, _paymentMethodId: string): void {}
  setPaymentMethodAsDefault(_userId: string, _paymentMethodId: string): void {}
  get(): Observable<User> {
    return of({ uid: 'userId' } as User);
  }
}

describe('PaymentMethodsComponent', () => {
  let component: PaymentMethodsComponent;
  let fixture: ComponentFixture<PaymentMethodsComponent>;
  let userService: UserService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentMethodsComponent,
        MockCxSpinnerComponent,
        CardComponent
      ],
      providers: [{ provide: UserService, useClass: MockUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    userService = TestBed.get(UserService);
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
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(true));

    function getSpinner(elem: DebugElement) {
      return elem.query(By.css('cx-spinner'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getSpinner(el)).toBeTruthy();
  });

  it('should show payment methods after loading', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    function getCard(elem: DebugElement) {
      return elem.query(By.css('cx-card'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getCard(el)).toBeTruthy();
  });

  it('should render all payment methods', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    spyOn(userService, 'getPaymentMethods').and.returnValue(
      of([mockPayment, mockPayment])
    );

    function getCards(elem: DebugElement) {
      return elem.queryAll(By.css('cx-card'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getCards(el).length).toEqual(2);
  });

  it('should render correct content in card', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    spyOn(userService, 'getPaymentMethods').and.returnValue(
      of([mockPayment, { ...mockPayment, defaultPayment: false }])
    );

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
    fixture.detectChanges();
    expect(getCardHeader(el)).toContain('DEFAULT');
    expect(getTextBold(el)).toContain(mockPayment.accountHolderName);
    expect(getCardNumber(el)).toContain(mockPayment.cardNumber);
    expect(getExpiration(el)).toContain(
      `Expires: ${mockPayment.expiryMonth}/${mockPayment.expiryYear}`
    );
  });

  it('should show confirm on delete', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));

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
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    spyOn(userService, 'deleteUserPaymentMethod').and.stub();

    function getDeleteButton(elem: DebugElement) {
      return elem.query(By.css('cx-card .card-link')).nativeElement;
    }
    function getConfirmButton(elem: DebugElement) {
      return elem.query(By.css('cx-card .btn-primary'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    getConfirmButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(userService.deleteUserPaymentMethod).toHaveBeenCalledWith(
      'userId',
      mockPayment.id
    );
  });

  it('should successfully set card as default', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    spyOn(userService, 'getPaymentMethods').and.returnValue(
      of([mockPayment, { ...mockPayment, defaultPayment: false }])
    );
    spyOn(userService, 'setPaymentMethodAsDefault').and.stub();

    function getSetDefaultButton(elem: DebugElement) {
      return elem.queryAll(By.css('cx-card .card-link'))[1].nativeElement;
    }
    component.ngOnInit();
    fixture.detectChanges();
    getSetDefaultButton(el).click();
    expect(userService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
      'userId',
      mockPayment.id
    );
  });
});
