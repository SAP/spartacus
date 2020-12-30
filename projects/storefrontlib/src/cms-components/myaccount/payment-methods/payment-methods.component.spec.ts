import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, PaymentDetails } from '@spartacus/core';
import { Card, PaymentMethodsService } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PaymentMethodsComponent } from './payment-methods.component';

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

const isLoadingSubject = new Subject();
isLoadingSubject.next(true);

class MockPaymentMethodsService {
  loading$ = isLoadingSubject;
  getCardContent(): Observable<Card[]> {
    return of();
  }
  delete(_paymentMethod: PaymentDetails): void {}
  setEdit(_paymentMethod: PaymentDetails): void {}
  setDefault(_paymentMethods: PaymentDetails): void {}
  cancelEdit(): void {}
  getCardIcon(_code: string): string {
    return '';
  }
  get(): Observable<PaymentDetails[]> {
    return of();
  }
}

describe('PaymentMethodsComponent', () => {
  let component: PaymentMethodsComponent;
  let fixture: ComponentFixture<PaymentMethodsComponent>;
  let paymentMethodsService: PaymentMethodsService;
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
          {
            provide: PaymentMethodsService,
            useClass: MockPaymentMethodsService,
          },
        ],
      })
        .overrideComponent(PaymentMethodsComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  function createComponent() {
    fixture = TestBed.createComponent(PaymentMethodsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  }

  function spyOnGetCardContent() {
    spyOn(paymentMethodsService, 'getCardContent').and.returnValue(
      of({
        header: 'paymentCard.defaultPaymentMethod',
        textBold: mockPayment.accountHolderName,
        text: [
          mockPayment.cardNumber,
          `paymentCard.expires month:${mockPayment.expiryMonth} year:${mockPayment.expiryYear}`,
        ],
        actions: [
          { name: 'Set as default', event: 'default' },
          { name: 'Delete', event: 'edit' },
        ],
        deleteMsg: 'paymentCard.deleteConfirmation',
        img: 'MASTER_CARD',
      })
    );
  }

  beforeEach(() => {
    paymentMethodsService = TestBed.inject(PaymentMethodsService);
  });

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should show basic information', () => {
    function getTitle(elem: DebugElement) {
      return elem.query(By.css('.cx-header')).nativeElement.textContent;
    }
    function getBodyMessage(elem: DebugElement) {
      return elem.query(By.css('.cx-msg')).nativeElement.textContent;
    }
    spyOn(paymentMethodsService, 'get').and.returnValue(of([mockPayment]));
    createComponent();

    fixture.detectChanges();
    expect(getTitle(el)).toContain('paymentMethods.paymentMethods');
    expect(getBodyMessage(el)).toContain(
      ' paymentMethods.newPaymentMethodsAreAddedDuringCheckout '
    );
  });

  it('should show spinner if payment methods are loading', () => {
    function getSpinner(elem: DebugElement) {
      return elem.query(By.css('cx-spinner'));
    }
    spyOn(paymentMethodsService, 'get').and.returnValue(of([mockPayment]));
    isLoadingSubject.next(true);

    createComponent();

    fixture.detectChanges();
    expect(getSpinner(el)).toBeTruthy();
  });

  it('should show payment methods after loading', () => {
    function getCard(elem: DebugElement) {
      return elem.query(By.css('cx-card'));
    }
    spyOn(paymentMethodsService, 'get').and.returnValue(of([mockPayment]));
    createComponent();
    fixture.detectChanges();
    expect(getCard(el)).toBeTruthy();
  });

  it('should render all payment methods', () => {
    function getCards(elem: DebugElement): DebugElement[] {
      return elem.queryAll(By.css('cx-card'));
    }
    spyOn(paymentMethodsService, 'get').and.returnValue(
      of([mockPayment, mockPayment])
    );

    createComponent();
    fixture.detectChanges();
    expect(getCards(el).length).toEqual(2);
  });

  it('should render correct content in card', () => {
    spyOn(paymentMethodsService, 'get').and.returnValue(
      of([mockPayment, { ...mockPayment, defaultPayment: false }])
    );

    spyOnGetCardContent();

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
    createComponent();
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
    spyOn(paymentMethodsService, 'get').and.returnValue(of([mockPayment]));
    spyOnGetCardContent();
    createComponent();
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    component.getEdit = () => mockPayment.id;
    fixture.detectChanges();
    expect(getDeleteMsg(el)).toContain('paymentCard.deleteConfirmation');
    getCancelButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(getCancelButton(el)).toBeFalsy();
  });

  it('should successfully delete card', () => {
    function getDeleteButton(elem: DebugElement): any {
      return elem.query(By.css('cx-card .card-link')).nativeElement;
    }
    function getConfirmButton(elem: DebugElement): DebugElement {
      return elem.query(By.css('cx-card .btn-primary'));
    }
    spyOn(paymentMethodsService, 'delete').and.stub();
    spyOn(paymentMethodsService, 'get').and.returnValue(of([mockPayment]));
    spyOnGetCardContent();
    createComponent();
    fixture.detectChanges();
    getDeleteButton(el).click();
    fixture.detectChanges();
    component.getEdit = () => mockPayment.id;
    fixture.detectChanges();
    getConfirmButton(el).nativeElement.click();
    fixture.detectChanges();
    expect(paymentMethodsService.delete).toHaveBeenCalledWith(mockPayment);
  });

  it('should successfully set card as default', () => {
    function getSetDefaultButton(elem: DebugElement): any {
      return elem.queryAll(By.css('cx-card .card-link'))[1].nativeElement;
    }
    spyOn(paymentMethodsService, 'setDefault').and.stub();
    spyOn(paymentMethodsService, 'get').and.returnValue(of([mockPayment]));
    spyOnGetCardContent();
    createComponent();
    fixture.detectChanges();
    getSetDefaultButton(el).click();
    expect(paymentMethodsService.setDefault).toHaveBeenCalledWith(mockPayment);
  });
});
