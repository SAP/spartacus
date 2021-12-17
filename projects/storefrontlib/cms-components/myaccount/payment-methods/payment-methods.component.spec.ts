import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageService,
  I18nTestingModule,
  PaymentDetails,
  UserPaymentService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PaymentMethodsComponent } from './payment-methods.component';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

@Component({
  template: '<div>Spinner</div>',
  selector: 'cx-spinner',
})
class MockCxSpinnerComponent {}

const mockPayment: PaymentDetails = {
  defaultPayment: true,
  accountHolderName: 'John Doe',
  cardNumber: '4111 1111 1111 1111',
  expiryMonth: '11',
  expiryYear: '2020',
  id: '2',
  cardType: {
    code: 'master',
  },
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

class MockUserPaymentService {
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of([mockPayment]);
  }
  loadPaymentMethods(): void {}
  deletePaymentMethod(_paymentMethodId: string): void {}
  setPaymentMethodAsDefault(_paymentMethodId: string): void {}
}

describe('PaymentMethodsComponent', () => {
  let component: PaymentMethodsComponent;
  let fixture: ComponentFixture<PaymentMethodsComponent>;
  let userService: UserPaymentService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          PaymentMethodsComponent,
          MockCxSpinnerComponent,
          CardComponent,
          MockCxIconComponent,
        ],
        providers: [
          { provide: UserPaymentService, useClass: MockUserPaymentService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    userService = TestBed.inject(UserPaymentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show basic information', () => {
    function getTitle(elem: DebugElement) {
      return elem.query(By.css('.cx-header')).nativeElement.textContent;
    }
    function getBodyMessage(elem: DebugElement) {
      return elem.query(By.css('.cx-msg')).nativeElement.textContent;
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getTitle(el)).toContain('paymentMethods.paymentMethods');
    expect(getBodyMessage(el)).toContain(
      ' paymentMethods.newPaymentMethodsAreAddedDuringCheckout '
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

    function getCards(elem: DebugElement): DebugElement[] {
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

    function getCardHeader(elem: DebugElement): string {
      return elem.query(By.css('cx-card .card-header')).nativeElement
        .textContent;
    }
    function getTextBold(elem: DebugElement): string {
      return elem.query(By.css('cx-card .cx-card-label-bold')).nativeElement
        .textContent;
    }
    function getCardNumber(elem: DebugElement): string {
      return elem.queryAll(By.css('cx-card .cx-card-label'))[0].nativeElement
        .textContent;
    }
    function getExpiration(elem: DebugElement): string {
      return elem.queryAll(By.css('cx-card .cx-card-label'))[1].nativeElement
        .textContent;
    }
    function getCardIcon(elem: DebugElement): any {
      return elem.query(By.css('.cx-card-img-container cx-icon'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(getCardHeader(el)).toContain('paymentCard.defaultPaymentMethod');
    expect(getTextBold(el)).toContain(mockPayment.accountHolderName);
    expect(getCardNumber(el)).toContain(mockPayment.cardNumber);
    expect(getExpiration(el)).toContain(
      `paymentCard.expires month:${mockPayment.expiryMonth} year:${mockPayment.expiryYear}`
    );
    expect(getCardIcon(el)).not.toBe(null);
  });

  it('should show confirm on delete', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));

    function getDeleteMsg(elem: DebugElement): string {
      return elem.query(By.css('cx-card .cx-card-delete-msg')).nativeElement
        .textContent;
    }
    function getDeleteButton(elem: DebugElement): any {
      return elem.query(By.css('cx-card .card-link')).nativeElement;
    }
    function getCancelButton(elem: DebugElement): DebugElement {
      return elem.query(By.css('cx-card .btn-secondary'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    expect(getDeleteMsg(el)).toContain('paymentCard.deleteConfirmation');
    getCancelButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(getCancelButton(el)).toBeFalsy();
  });

  it('should successfully delete card', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    spyOn(userService, 'deletePaymentMethod').and.stub();

    function getDeleteButton(elem: DebugElement): any {
      return elem.query(By.css('cx-card .card-link')).nativeElement;
    }
    function getConfirmButton(elem: DebugElement): DebugElement {
      return elem.query(By.css('cx-card .btn-primary'));
    }
    component.ngOnInit();
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    getConfirmButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(userService.deletePaymentMethod).toHaveBeenCalledWith(
      mockPayment.id
    );
  });

  it('should successfully set card as default', () => {
    spyOn(userService, 'getPaymentMethodsLoading').and.returnValue(of(false));
    spyOn(userService, 'getPaymentMethods').and.returnValue(
      of([mockPayment, { ...mockPayment, defaultPayment: false }])
    );
    spyOn(userService, 'setPaymentMethodAsDefault').and.stub();

    function getSetDefaultButton(elem: DebugElement): any {
      return elem.queryAll(By.css('cx-card .card-link'))[1].nativeElement;
    }
    component.ngOnInit();
    fixture.detectChanges();
    getSetDefaultButton(el).click();
    expect(userService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
      mockPayment.id
    );
  });

  it('should return the proper card icon based on its card type', () => {
    const otherCardType = 'MockCardType';

    expect(component.getCardIcon('visa')).toBe(ICON_TYPE.VISA);
    expect(component.getCardIcon('master')).toBe(ICON_TYPE.MASTER_CARD);
    expect(component.getCardIcon('mastercard_eurocard')).toBe(
      ICON_TYPE.MASTER_CARD
    );
    expect(component.getCardIcon('diners')).toBe(ICON_TYPE.DINERS_CLUB);
    expect(component.getCardIcon('amex')).toBe(ICON_TYPE.AMEX);
    expect(component.getCardIcon(otherCardType)).toBe(ICON_TYPE.CREDIT_CARD);
  });
});
