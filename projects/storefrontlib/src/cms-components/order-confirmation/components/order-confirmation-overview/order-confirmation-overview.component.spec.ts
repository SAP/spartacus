import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Address,
  CheckoutService,
  DeliveryMode,
  I18nTestingModule,
  Order,
  PaymentDetails,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Card } from '../../../../shared/components/card/card.component';
import { OrderConfirmationOverviewComponent } from './order-confirmation-overview.component';
import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-card', template: '' })
class MockCardComponent {
  @Input()
  content: Card;
}

const mockOrder: Order = {
  code: 'test-code-412',
  deliveryAddress: {
    country: {},
  },
  deliveryMode: {},
  paymentInfo: {
    billingAddress: {
      country: {},
    },
  },
};

const mockB2BOrder: Order = {
  ...mockOrder,
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
  orgCustomer: {
    active: true,
    name: 'Rivers',
    orgUnit: {
      name: 'Rustic',
    },
  },
  purchaseOrderNumber: '123',
};

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

const mockDeliveryAddress: Address = {
  firstName: 'John',
  lastName: 'Smith',
  line1: 'Buckingham Street 5',
  line2: '1A',
  phone: '(+11) 111 111 111',
  postalCode: 'MA8902',
  town: 'London',
  country: {
    isocode: 'UK',
  },
};

const mockDeliveryMode: DeliveryMode = {
  name: 'Standard order-detail-shipping',
  description: '3-5 days',
};

const mockBillingAddress: Address = {
  firstName: 'John',
  lastName: 'Smith',
  line1: 'Buckingham Street 5',
  line2: '1A',
  phone: '(+11) 111 111 111',
  postalCode: 'MA8902',
  town: 'London',
  country: {
    isocode: 'UK',
  },
};

const mockPayment: PaymentDetails = {
  accountHolderName: 'John Smith',
  cardNumber: '************6206',
  expiryMonth: '12',
  expiryYear: '2026',
  cardType: {
    name: 'Visa',
  },
};

describe('OrderConfirmationOverviewComponent', () => {
  let component: OrderConfirmationOverviewComponent;
  let fixture: ComponentFixture<OrderConfirmationOverviewComponent>;
  let checkoutService: CheckoutService;
  let translationService: TranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [OrderConfirmationOverviewComponent, MockCardComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationOverviewComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    translationService = TestBed.inject(TranslationService);
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call getAddressCardContent(deliveryAddress: Address)', () => {
    spyOn(component, 'getAddressCardContent').and.callThrough();
    spyOn(translationService, 'translate').and.returnValue(of('test'));
    component.getAddressCardContent(mockDeliveryAddress).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.title).toEqual('test');
    });
    expect(component.getAddressCardContent).toHaveBeenCalledWith(
      mockDeliveryAddress
    );
  });

  it('should call getDeliveryModeCardContent(deliveryMode: DeliveryMode)', () => {
    spyOn(component, 'getDeliveryModeCardContent').and.callThrough();
    spyOn(translationService, 'translate').and.returnValue(of('test'));
    component.getDeliveryModeCardContent(mockDeliveryMode).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.title).toEqual('test');
    });
    component.getDeliveryModeCardContent(mockDeliveryMode);
    expect(component.getDeliveryModeCardContent).toHaveBeenCalledWith(
      mockDeliveryMode
    );
  });

  it('should call getBillingAddressCardContent(billingAddress: Address)', () => {
    spyOn(component, 'getBillingAddressCardContent').and.callThrough();
    spyOn(translationService, 'translate').and.returnValue(of('test'));
    component
      .getBillingAddressCardContent(mockBillingAddress)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual('test');
      });
    component.getBillingAddressCardContent(mockBillingAddress);
    expect(component.getBillingAddressCardContent).toHaveBeenCalledWith(
      mockBillingAddress
    );
  });

  it('should call getPaymentInfoCardContent(payment: PaymentDetails)', () => {
    spyOn(component, 'getPaymentInfoCardContent').and.callThrough();
    spyOn(translationService, 'translate').and.returnValue(of('test'));
    component.getPaymentInfoCardContent(mockPayment).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.title).toEqual('test');
    });
    component.getPaymentInfoCardContent(mockPayment);
    expect(component.getPaymentInfoCardContent).toHaveBeenCalledWith(
      mockPayment
    );
  });

  it('should call getAccountPaymentCardContent(order: Order)', () => {
    spyOn(checkoutService, 'getOrderDetails').and.returnValue(of(mockB2BOrder));
    spyOn(component, 'getAccountPaymentCardContent').and.callThrough();
    spyOn(translationService, 'translate').and.returnValue(of('test'));
    component.getAccountPaymentCardContent(mockB2BOrder).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.title).toEqual('test');
    });
    component.getAccountPaymentCardContent(mockB2BOrder);
    expect(component.getAccountPaymentCardContent).toHaveBeenCalledWith(
      mockB2BOrder
    );
  });
});
