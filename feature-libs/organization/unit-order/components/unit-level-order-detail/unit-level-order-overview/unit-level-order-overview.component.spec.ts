import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  Address,
  I18nTestingModule,
  PaymentDetails,
  RequiredPick,
  TranslationService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { UnitLevelOrderDetailService } from '../unit-level-order-detail.service';
import { UnitLevelOrderOverviewComponent } from './unit-level-order-overview.component';

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

const mockOrder: RequiredPick<
  Order,
  | 'code'
  | 'created'
  | 'statusDisplay'
  | 'purchaseOrderNumber'
  | 'paymentInfo'
  | 'costCenter'
  | 'deliveryMode'
  | 'orgUnit'
  | 'orgCustomer'
  | 'deliveryAddress'
> = {
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
  orgCustomer: {
    uid: 'gi.sun@rustic-hw.com|powertools-standalone',
    name: 'Gi Sun',
    email: 'gi.sun@rustic-hw.com',
  },
  orgUnit: {
    name: 'Rustic',
  },
};

const mockUnformattedAddress = 'test1, , test3, test4';
const mockFormattedAddress = 'test1, test2, test3, test4';

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}

class MockOrderDetailsService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

describe('UnitLevelOrderOverviewComponent', () => {
  let component: UnitLevelOrderOverviewComponent;
  let fixture: ComponentFixture<UnitLevelOrderOverviewComponent>;
  let translationService: TranslationService;
  let orderDetailService: UnitLevelOrderDetailService;

  //TODO: investigate why 'waitForAsync' is not working in the spare time
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [UnitLevelOrderOverviewComponent, MockCardComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: UnitLevelOrderDetailService,
          useClass: MockOrderDetailsService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLevelOrderOverviewComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    orderDetailService = TestBed.inject(UnitLevelOrderDetailService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrderDetails', () => {
    spyOn(orderDetailService, 'getOrderDetails').and.callThrough();
    component.ngOnInit();
    expect(orderDetailService.getOrderDetails).toHaveBeenCalled();
  });

  describe('when replenishment is NOT defined', () => {
    beforeEach(() => {
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

    it('should call getOrderCurrentDateCardContent(isoDate: string)', () => {
      spyOn(component, 'getOrderCurrentDateCardContent').and.callThrough();

      const date = mockOrder.created.toDateString();

      component
        .getOrderCurrentDateCardContent(date)
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
          expect(data.text).toEqual([`(${mockOrder.costCenter?.unit?.name})`]);
        })
        .unsubscribe();

      expect(component.getCostCenterCardContent).toHaveBeenCalledWith(
        mockOrder.costCenter
      );
    });
  });

  describe('when paymentInfo is defined', () => {
    beforeEach(() => {
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

      const billingAddress = mockOrder.paymentInfo.billingAddress as Address;

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
            billingAddress.country?.name,
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
            deliveryAddress.country?.name,
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
            mockOrder.deliveryMode.deliveryCost?.formattedValue,
          ]);
        })
        .unsubscribe();

      expect(component.getDeliveryModeCardContent).toHaveBeenCalledWith(
        mockOrder.deliveryMode
      );
    });
  });

  describe('normalize formatted address', () => {
    it('should normalize address when line 2 is empty in address', () => {
      const address = component['normalizeFormattedAddress'](
        mockUnformattedAddress
      );

      expect(address).toEqual('test1, test3, test4');
    });

    it('should not change the format when line 2 exist in address', () => {
      const address =
        component['normalizeFormattedAddress'](mockFormattedAddress);

      expect(address).toEqual(mockFormattedAddress);
    });
  });

  describe('when unit order is defined', () => {
    beforeEach(() => {
      spyOn(translationService, 'translate').and.returnValue(of('test'));
    });

    it('should call getBuyerNameCardContent(customer: B2BUser)', () => {
      spyOn(component, 'getBuyerNameCardContent').and.callThrough();

      component
        .getBuyerNameCardContent(mockOrder.orgCustomer)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([
            mockOrder.orgCustomer?.name,
            '(' + mockOrder.orgCustomer?.email + ')',
          ]);
        })
        .unsubscribe();

      expect(component.getBuyerNameCardContent).toHaveBeenCalledWith(
        mockOrder.orgCustomer
      );
    });

    it('should call getUnitNameCardContent(orgUnit: string)', () => {
      spyOn(component, 'getUnitNameCardContent').and.callThrough();

      component
        .getUnitNameCardContent(mockOrder.orgUnit.name as string)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([mockOrder.orgUnit.name]);
        })
        .unsubscribe();

      expect(component.getUnitNameCardContent).toHaveBeenCalledWith(
        mockOrder.orgUnit.name
      );
    });
  });
});
