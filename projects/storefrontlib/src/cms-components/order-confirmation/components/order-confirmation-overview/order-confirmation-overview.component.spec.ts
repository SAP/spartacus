import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Address,
  CheckoutService,
  DeliveryMode,
  I18nTestingModule,
  Order,
  PaymentDetails,
  ReplenishmentOrder,
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
  deliveryCost: {
    formattedValue: 'test-formatted-cosg',
  },
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
    name: 'test-country-name',
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
  billingAddress: mockBillingAddress,
};

const mockOrder: Order = {
  code: 'test-code-412',
  deliveryAddress: mockDeliveryAddress,
  deliveryMode: mockDeliveryMode,
  paymentInfo: mockBillingAddress,
  statusDisplay: 'test-status-display',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  firstDate: '1994-01-11T00:00Z',
  trigger: {
    activationTime: '1994-01-11T00:00Z',
    displayTimeTable: 'every-test-date',
  },
  paymentType: {
    code: 'test-type',
    displayName: 'test-type-name',
  },
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
  paymentInfo: mockPayment,
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

  describe('when replenishment order code is defined', () => {
    beforeEach(() => {
      spyOn(checkoutService, 'getOrderDetails').and.returnValue(
        of(mockReplenishmentOrder)
      );
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getReplenishmentCodeCardContent(orderCode: string)', () => {
      spyOn(component, 'getReplenishmentCodeCardContent').and.callThrough();

      component
        .getReplenishmentCodeCardContent(
          mockReplenishmentOrder.replenishmentOrderCode
        )
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([
            mockReplenishmentOrder.replenishmentOrderCode,
          ]);
        })
        .unsubscribe();

      expect(component.getReplenishmentCodeCardContent).toHaveBeenCalledWith(
        mockReplenishmentOrder.replenishmentOrderCode
      );
    });

    it('should call getOrderCurrentDateCardContent()', () => {
      spyOn(component, 'getOrderCurrentDateCardContent').and.callThrough();

      const date = component['getDate'](new Date());

      component
        .getOrderCurrentDateCardContent()
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([date]);
        })
        .unsubscribe();

      expect(component.getOrderCurrentDateCardContent).toHaveBeenCalled();
    });

    it('should call getReplenishmentActiveCardContent(active: boolean)', () => {
      spyOn(component, 'getReplenishmentActiveCardContent').and.callThrough();

      component
        .getReplenishmentActiveCardContent(mockReplenishmentOrder.active)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual(['test']);
        })
        .unsubscribe();

      expect(component.getReplenishmentActiveCardContent).toHaveBeenCalledWith(
        mockReplenishmentOrder.active
      );
    });

    it('should call getReplenishmentStartOnCardContent(isoDate: string)', () => {
      spyOn(component, 'getReplenishmentStartOnCardContent').and.callThrough();

      const date = component['getDate'](
        new Date(mockReplenishmentOrder.firstDate)
      );

      component
        .getReplenishmentStartOnCardContent(mockReplenishmentOrder.firstDate)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([date]);
        })
        .unsubscribe();

      expect(component.getReplenishmentStartOnCardContent).toHaveBeenCalledWith(
        mockReplenishmentOrder.firstDate
      );
    });

    it('should call getReplenishmentFrequencyCardContent(frequency: string)', () => {
      spyOn(
        component,
        'getReplenishmentFrequencyCardContent'
      ).and.callThrough();

      component
        .getReplenishmentFrequencyCardContent(
          mockReplenishmentOrder.trigger.displayTimeTable
        )
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([
            mockReplenishmentOrder.trigger.displayTimeTable,
          ]);
        })
        .unsubscribe();

      expect(
        component.getReplenishmentFrequencyCardContent
      ).toHaveBeenCalledWith(mockReplenishmentOrder.trigger.displayTimeTable);
    });

    it('should call getReplenishmentNextDateCardContent(isoDate: string)', () => {
      spyOn(component, 'getReplenishmentNextDateCardContent').and.callThrough();

      const date = component['getDate'](
        new Date(mockReplenishmentOrder.trigger.activationTime)
      );

      component
        .getReplenishmentNextDateCardContent(
          mockReplenishmentOrder.trigger.activationTime
        )
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([date]);
        })
        .unsubscribe();

      expect(
        component.getReplenishmentNextDateCardContent
      ).toHaveBeenCalledWith(mockReplenishmentOrder.trigger.activationTime);
    });
  });

  describe('when replenishment is NOT defined', () => {
    beforeEach(() => {
      spyOn(checkoutService, 'getOrderDetails').and.returnValue(of(mockOrder));
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getOrderCodeCardContent(orderCode: string)', () => {
      spyOn(component, 'getOrderCodeCardContent').and.callThrough();

      component
        .getOrderCodeCardContent(mockOrder.code)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([mockOrder.code]);
        })
        .unsubscribe();

      expect(component.getOrderCodeCardContent).toHaveBeenCalledWith(
        mockOrder.code
      );
    });

    it('should call getOrderCurrentDateCardContent()', () => {
      spyOn(component, 'getOrderCurrentDateCardContent').and.callThrough();

      const date = component['getDate'](new Date());

      component
        .getOrderCurrentDateCardContent()
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([date]);
        })
        .unsubscribe();

      expect(component.getOrderCurrentDateCardContent).toHaveBeenCalled();
    });

    it('should call getOrderStatusCardContent(status: string)', () => {
      spyOn(component, 'getOrderStatusCardContent').and.callThrough();

      component
        .getOrderStatusCardContent(mockOrder.statusDisplay)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual(['test']);
        })
        .unsubscribe();

      expect(component.getOrderStatusCardContent).toHaveBeenCalledWith(
        mockOrder.statusDisplay
      );
    });
  });

  describe('when purchase order number is defined', () => {
    beforeEach(() => {
      spyOn(checkoutService, 'getOrderDetails').and.returnValue(
        of(mockReplenishmentOrder)
      );
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getPurchaseOrderNumber(poNumber: string)', () => {
      spyOn(component, 'getPurchaseOrderNumber').and.callThrough();

      component
        .getPurchaseOrderNumber(mockReplenishmentOrder.purchaseOrderNumber)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([
            mockReplenishmentOrder.purchaseOrderNumber,
          ]);
        })
        .unsubscribe();

      expect(component.getPurchaseOrderNumber).toHaveBeenCalledWith(
        mockReplenishmentOrder.purchaseOrderNumber
      );
    });

    it('should call getMethodOfPaymentCardContent(hasPaymentInfo: PaymentDetails)', () => {
      spyOn(component, 'getMethodOfPaymentCardContent').and.callThrough();

      component
        .getMethodOfPaymentCardContent(mockReplenishmentOrder.paymentInfo)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual(['test']);
        })
        .unsubscribe();

      expect(component.getMethodOfPaymentCardContent).toHaveBeenCalledWith(
        mockReplenishmentOrder.paymentInfo
      );
    });

    it('should call getCostCenterCardContent(costCenter: CostCenter)', () => {
      spyOn(component, 'getCostCenterCardContent').and.callThrough();

      component
        .getCostCenterCardContent(mockReplenishmentOrder.costCenter)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(mockReplenishmentOrder.costCenter.name);
          expect(data.text).toEqual([
            `(${mockReplenishmentOrder.costCenter.unit.name})`,
          ]);
        })
        .unsubscribe();

      expect(component.getCostCenterCardContent).toHaveBeenCalledWith(
        mockReplenishmentOrder.costCenter
      );
    });
  });

  describe('when paymentInfo is defined', () => {
    beforeEach(() => {
      spyOn(checkoutService, 'getOrderDetails').and.returnValue(of(mockOrder));
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getPaymentInfoCardContent(payment: PaymentDetails)', () => {
      spyOn(component, 'getPaymentInfoCardContent').and.callThrough();

      component
        .getPaymentInfoCardContent(mockOrder.paymentInfo)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(
            mockOrder.paymentInfo.accountHolderName
          );
          expect(data.text).toEqual([mockOrder.paymentInfo.cardNumber, 'test']);
        })
        .unsubscribe();

      expect(component.getPaymentInfoCardContent).toHaveBeenCalledWith(
        mockOrder.paymentInfo
      );
    });

    it('should call getBillingAddressCardContent(billingAddress: Address)', () => {
      spyOn(component, 'getBillingAddressCardContent').and.callThrough();

      const billingAddress = mockOrder.paymentInfo.billingAddress;

      component
        .getBillingAddressCardContent(billingAddress)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(
            `${billingAddress.firstName} ${billingAddress.lastName}`
          );
          expect(data.text).toEqual([
            `${billingAddress.line1}, ${billingAddress.town}, ${billingAddress.country.isocode}`,
            `${billingAddress.line2}, ${billingAddress.town}, ${billingAddress.country.isocode}`,
            `${billingAddress.country.name}, ${billingAddress.postalCode}`,
          ]);
        })
        .unsubscribe();

      expect(component.getBillingAddressCardContent).toHaveBeenCalledWith(
        billingAddress
      );
    });
  });

  describe('common column in all types of order', () => {
    beforeEach(() => {
      spyOn(checkoutService, 'getOrderDetails').and.returnValue(
        of(mockReplenishmentOrder)
      );
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getAddressCardContent(deliveryAddress: Address)', () => {
      spyOn(component, 'getAddressCardContent').and.callThrough();

      const deliveryAddress = mockReplenishmentOrder.deliveryAddress;

      component
        .getAddressCardContent(deliveryAddress)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(
            `${deliveryAddress.firstName} ${deliveryAddress.lastName}`
          );
          expect(data.text).toEqual([
            `${deliveryAddress.line1}, ${deliveryAddress.town}, ${deliveryAddress.country.isocode}`,
            `${deliveryAddress.line2}, ${deliveryAddress.town}, ${deliveryAddress.country.isocode}`,
            `${deliveryAddress.country.name}, ${deliveryAddress.postalCode}`,
          ]);
        })
        .unsubscribe();

      expect(component.getAddressCardContent).toHaveBeenCalledWith(
        deliveryAddress
      );
    });

    it('should call getDeliveryModeCardContent(deliveryMode: DeliveryMode)', () => {
      spyOn(component, 'getDeliveryModeCardContent').and.callThrough();

      component
        .getDeliveryModeCardContent(mockReplenishmentOrder.deliveryMode)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(
            mockReplenishmentOrder.deliveryMode.name
          );
          expect(data.text).toEqual([
            mockReplenishmentOrder.deliveryMode.description,
            mockReplenishmentOrder.deliveryMode.deliveryCost.formattedValue,
          ]);
        })
        .unsubscribe();

      expect(component.getDeliveryModeCardContent).toHaveBeenCalledWith(
        mockReplenishmentOrder.deliveryMode
      );
    });
  });
});
