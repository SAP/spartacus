import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  CartService,
  GlobalMessageService,
  Address,
  PaymentDetails,
  Order,
  Cart,
  I18nTestingModule,
} from '@spartacus/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;

import { MultiStepCheckoutComponent } from './multi-step-checkout.component';
import { CheckoutDetailsService } from '../../../checkout-details.service';

class MockCheckoutService {
  getCheckoutDetailsLoaded$ = of(true);
  getSelectedDeliveryModeCode(): Observable<string> {
    return of('');
  }

  getDeliveryAddress(): Observable<Address> {
    return of({ firstName: 'Test' });
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return of({ accountHolderName: 'test' });
  }

  getOrderDetails(): Observable<Order> {
    return of({});
  }
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
const mockDeliveryAddresses: string[] = ['address1', 'address2'];
const mockSelectedCode = 'test mode';
const mockOrderDetails = { id: '1234' };

@Component({ selector: 'cx-delivery-mode', template: '' })
class MockDeliveryModeComponent {}

@Component({ selector: 'cx-payment-method', template: '' })
class MockPaymentMethodComponent {}

@Component({ selector: 'cx-review-submit', template: '' })
class MockReviewSubmitComponent {}

@Component({ selector: 'cx-shipping-address', template: '' })
class MockShippingAddressComponent {}

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: Cart;
}

@Component({ selector: 'cx-place-order', template: '' })
class MockPlaceOrderComponent {}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('MultiStepCheckoutComponent', () => {
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;

  let mockCheckoutService: MockCheckoutService;
  let mockCartService: any;
  let mockGlobalMessageService: any;

  const mockAllSteps = () => {
    spyOn(mockCheckoutService, 'getDeliveryAddress').and.returnValue(
      of(mockDeliveryAddresses)
    );
    spyOn(mockCheckoutService, 'getSelectedDeliveryModeCode').and.returnValue(
      of(mockSelectedCode)
    );
    spyOn(mockCheckoutService, 'getPaymentDetails').and.returnValue(
      of(mockPaymentDetails)
    );
    spyOn(mockCheckoutService, 'getOrderDetails').and.returnValue(
      of(mockOrderDetails)
    );
  };

  beforeEach(async(() => {
    mockCartService = {
      getActive(): BehaviorSubject<Cart> {
        return new BehaviorSubject({
          totalItems: 5141,
          subTotal: { formattedValue: '11119' },
        });
      },
      loadDetails: createSpy(),
    };
    mockGlobalMessageService = {
      add: createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        MockUrlPipe,
        MultiStepCheckoutComponent,
        MockDeliveryModeComponent,
        MockPaymentMethodComponent,
        MockReviewSubmitComponent,
        MockShippingAddressComponent,
        MockOrderSummaryComponent,
        MockPlaceOrderComponent,
      ],
      providers: [
        { provide: CheckoutDetailsService, useClass: MockCheckoutService },
        { provide: CartService, useValue: mockCartService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
      ],
    }).compileComponents();

    mockCartService = TestBed.get(CartService);
    mockCheckoutService = TestBed.get(CheckoutDetailsService);

    fixture = TestBed.createComponent(MultiStepCheckoutComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() before process steps', () => {
    spyOn(mockCartService, 'getActive');
    component.ngOnInit();
    expect(component.step).toEqual(1);
    expect(mockCartService.getActive).toHaveBeenCalled();
  });

  it('should call nextStep()', () => {
    // next step is 3
    component.nextStep(3);

    expect(component.navs[0].status.completed).toBeFalsy();
    expect(component.navs[0].status.active).toBeFalsy();
    expect(component.navs[0].progressBar).toBeFalsy();

    expect(component.navs[1].status.completed).toBeTruthy();
    expect(component.navs[1].status.active).toBeFalsy();
    expect(component.navs[1].progressBar).toBeTruthy();

    // except step3 (navs[2]), other steps are not active
    expect(component.navs[2].status.active).toBeTruthy();
    expect(component.navs[2].status.disabled).toBeFalsy();
    expect(component.navs[2].progressBar).toBeTruthy();

    expect(component.navs[3].status.active).toBeFalsy();
    expect(component.navs[3].progressBar).toBeFalsy();

    expect(component.step).toBe(3);
  });

  it('should contain proper total value and total items', () => {
    fixture.detectChanges();
    const values = fixture.debugElement.query(By.css('.cx-list-media'))
      .nativeElement.textContent;

    expect(values).toContain('5141');
    expect(values).toContain('11119');
  });

  it('should highlight proper step', () => {
    fixture.detectChanges();
    const steps = fixture.debugElement.queryAll(By.css('.cx-item a'));
    steps[0].nativeElement.click();
    expect(steps[0].nativeElement.getAttribute('class')).toContain('is-active');
    expect(steps[1].nativeElement.getAttribute('class')).not.toContain(
      'is-active'
    );
  });

  it('should show terms and conditions on step 4 only', () => {
    component.ngOnInit();

    const getPlaceOrderForm = () =>
      fixture.debugElement.query(By.css('.cx-place-order-form'));

    expect(getPlaceOrderForm()).toBeFalsy();
  });

  it('should call nextStep(3) when back button clicked', () => {
    spyOn(component, 'nextStep').and.callThrough();
    mockAllSteps();
    component.step = 4;

    fixture.detectChanges();

    const getBackBtn = () =>
      fixture.debugElement.query(By.css('.cx-place-order .btn-action'))
        .nativeElement;
    getBackBtn().click();
    expect(component.nextStep).toHaveBeenCalledWith(3);
  });
});
