import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Address,
  DeliveryMode,
  I18nTestingModule,
  Order,
  PaymentDetails,
  ReplenishmentOrder,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailShippingComponent } from './order-detail-shipping.component';

const mockDeliveryAddress: Address = {
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
  formattedAddress: 'test-formattedAddress',
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
  formattedAddress: 'test-formattedAddress',
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

const mockOrder: Order = {
  code: 'test-code-412',
  deliveryAddress: mockDeliveryAddress,
  deliveryMode: mockDeliveryMode,
  paymentInfo: mockPayment,
  statusDisplay: 'test-status-display',
  created: new Date('2019-02-11T13:02:58+0000'),
  purchaseOrderNumber: 'test-po',
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
};

class MockOrderDetailsService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

describe('OrderDetailShippingComponent', () => {
  let component: OrderDetailShippingComponent;
  let fixture: ComponentFixture<OrderDetailShippingComponent>;
  let orderDetailsService: OrderDetailsService;
  let translationService: TranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CardModule, I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
      declarations: [OrderDetailShippingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailShippingComponent);
    orderDetailsService = TestBed.inject(OrderDetailsService);
    translationService = TestBed.inject(TranslationService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let order: Order;
    component.order$
      .subscribe((value) => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
  });

  describe('when replenishment order code is defined', () => {
    beforeEach(() => {
      spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
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
      spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
        of(mockOrder)
      );
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

    it('should call getOrderCurrentDateCardContent(isoDate?: string)', () => {
      spyOn(component, 'getOrderCurrentDateCardContent').and.callThrough();

      const date = component['getDate'](mockOrder.created);

      component
        .getOrderCurrentDateCardContent(mockOrder.created.toDateString())
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
      spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
        of(mockOrder)
      );
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getPurchaseOrderNumber(poNumber: string)', () => {
      spyOn(component, 'getPurchaseOrderNumber').and.callThrough();

      component
        .getPurchaseOrderNumber(mockOrder.purchaseOrderNumber)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([mockOrder.purchaseOrderNumber]);
        })
        .unsubscribe();

      expect(component.getPurchaseOrderNumber).toHaveBeenCalledWith(
        mockOrder.purchaseOrderNumber
      );
    });

    it('should call getMethodOfPaymentCardContent(hasPaymentInfo: PaymentDetails)', () => {
      spyOn(component, 'getMethodOfPaymentCardContent').and.callThrough();

      component
        .getMethodOfPaymentCardContent(mockOrder.paymentInfo)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual(['test']);
        })
        .unsubscribe();

      expect(component.getMethodOfPaymentCardContent).toHaveBeenCalledWith(
        mockOrder.paymentInfo
      );
    });

    it('should call getCostCenterCardContent(costCenter: CostCenter)', () => {
      spyOn(component, 'getCostCenterCardContent').and.callThrough();

      component
        .getCostCenterCardContent(mockOrder.costCenter)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(mockOrder.costCenter.name);
          expect(data.text).toEqual([`(${mockOrder.costCenter.unit.name})`]);
        })
        .unsubscribe();

      expect(component.getCostCenterCardContent).toHaveBeenCalledWith(
        mockOrder.costCenter
      );
    });
  });

  describe('when paymentInfo is defined', () => {
    beforeEach(() => {
      spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
        of(mockOrder)
      );
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
            billingAddress.formattedAddress,
            billingAddress.country.name,
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
      spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
        of(mockOrder)
      );
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getAddressCardContent(deliveryAddress: Address)', () => {
      spyOn(component, 'getAddressCardContent').and.callThrough();

      const deliveryAddress = mockOrder.deliveryAddress;

      component
        .getAddressCardContent(deliveryAddress)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(
            `${deliveryAddress.firstName} ${deliveryAddress.lastName}`
          );
          expect(data.text).toEqual([
            deliveryAddress.formattedAddress,
            deliveryAddress.country.name,
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
        .getDeliveryModeCardContent(mockOrder.deliveryMode)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.textBold).toEqual(mockOrder.deliveryMode.name);
          expect(data.text).toEqual([
            mockOrder.deliveryMode.description,
            mockOrder.deliveryMode.deliveryCost.formattedValue,
          ]);
        })
        .unsubscribe();

      expect(component.getDeliveryModeCardContent).toHaveBeenCalledWith(
        mockOrder.deliveryMode
      );
    });
  });
});
