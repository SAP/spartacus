import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  Address,
  CmsOrderDetailOverviewComponent,
  CxDatePipe,
  FeatureToggles,
  MockDatePipe,
  MockTranslatePipe,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import { Order, OrderConfig, ReplenishmentOrder } from '@spartacus/order/root';
import { Card, CardComponent, CmsComponentData } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { OrderDetailsService } from '../order-details.service';
import { OrderOverviewComponentService } from './order-overview-component.service';
import { OrderOverviewComponent } from './order-overview.component';

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  content: Card;
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockOrderConfig: OrderConfig = { showOrderQuoteLink: true };

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

const mockUnformattedAddress = 'test1, , test3, test4';
const mockFormattedAddress = 'test1, test2, test3, test4';

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}

class MockOrderDetailsService {
  isOrderDetailsLoading(): Observable<boolean> {
    return of(false);
  }
  getOrderDetails() {
    return of(mockOrder);
  }
}
class MockOrderOverviewComponentService {
  shouldShowDeliveryMode(_mode: DeliveryMode): boolean {
    return true;
  }
}

const mockData: CmsOrderDetailOverviewComponent = {
  simple: false,
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockData),
};

describe('OrderOverviewComponent', () => {
  let component: OrderOverviewComponent;
  let fixture: ComponentFixture<OrderOverviewComponent>;
  let translationService: TranslationService;
  let orderDetailsService: OrderDetailsService;
  let componentService: OrderOverviewComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrderOverviewComponent, RouterModule.forRoot([])],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: OrderOverviewComponentService,
          useClass: MockOrderOverviewComponentService,
        },
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: OrderConfig, useValue: mockOrderConfig },
      ],
    })
      .overrideComponent(OrderOverviewComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, CardComponent, UrlPipe],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCardComponent,
            MockUrlPipe,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    orderDetailsService = TestBed.inject(OrderDetailsService);
    componentService = TestBed.inject(OrderOverviewComponentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when replenishment order code is defined', () => {
    beforeEach(() => {
      vi.spyOn(orderDetailsService, 'getOrderDetails').mockReturnValue(
        of(mockReplenishmentOrder)
      );
      vi.spyOn(translationService, 'translate').mockReturnValue(of('test'));
    });

    it('should call getReplenishmentCodeCardContent(orderCode: string)', () => {
      vi.spyOn(component, 'getReplenishmentCodeCardContent');

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
      vi.spyOn(component, 'getReplenishmentActiveCardContent');

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
      vi.spyOn(component, 'getReplenishmentStartOnCardContent');

      const date = mockReplenishmentOrder.firstDate;

      component
        .getReplenishmentStartOnCardContent(date)
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
      vi.spyOn(component, 'getReplenishmentFrequencyCardContent');

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
      vi.spyOn(component, 'getReplenishmentNextDateCardContent');

      const date = mockReplenishmentOrder.trigger.activationTime;

      component
        .getReplenishmentNextDateCardContent(date)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([date]);
        })
        .unsubscribe();

      expect(
        component.getReplenishmentNextDateCardContent
      ).toHaveBeenCalledWith(date);
    });
  });

  describe('when replenishment is NOT defined', () => {
    beforeEach(() => {
      vi.spyOn(translationService, 'translate').mockReturnValue(of('test'));
    });

    it('should call getOrderCodeCardContent(orderCode: string)', () => {
      vi.spyOn(component, 'getOrderCodeCardContent');

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
      vi.spyOn(component, 'getOrderCurrentDateCardContent');

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
      vi.spyOn(component, 'getOrderStatusCardContent');

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
      vi.spyOn(translationService, 'translate').mockReturnValue(of('test'));
    });

    it('should call getPurchaseOrderNumber(poNumber: string)', () => {
      vi.spyOn(component, 'getPurchaseOrderNumber');

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
      vi.spyOn(component, 'getMethodOfPaymentCardContent');

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
      vi.spyOn(component, 'getCostCenterCardContent');

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
      vi.spyOn(translationService, 'translate').mockReturnValue(of('test'));
    });

    it('should call getPaymentInfoCardContent(payment: PaymentDetails)', () => {
      vi.spyOn(component, 'getPaymentInfoCardContent');

      component
        .getPaymentInfoCardContent(mockOrder.paymentInfo)
        .subscribe((data) => {
          expect(data).toBeTruthy();
          expect(data.title).toEqual('test');
          expect(data.text).toEqual([
            mockOrder.paymentInfo?.cardType?.name,
            mockOrder.paymentInfo?.accountHolderName,
            mockOrder.paymentInfo?.cardNumber,
            'test',
          ]);
        })
        .unsubscribe();

      expect(component.getPaymentInfoCardContent).toHaveBeenCalledWith(
        mockOrder.paymentInfo
      );
    });

    it('should isPaymentInfoCardFull be falsy when paymentInfo is partial', () => {
      expect(
        component.isPaymentInfoCardFull({
          ...mockOrder.paymentInfo,
          expiryMonth: undefined,
        })
      ).toBeFalsy();
    });

    it('should call getBillingAddressCardContent(billingAddress: Address)', () => {
      vi.spyOn(component, 'getBillingAddressCardContent');

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
      vi.spyOn(translationService, 'translate').mockReturnValue(of('test'));
    });

    it('should call getAddressCardContent(deliveryAddress: Address)', () => {
      vi.spyOn(component, 'getAddressCardContent');

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
      vi.spyOn(component, 'getDeliveryModeCardContent');

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

  describe('show delivery mode in order summary', () => {
    it('should show delivery mode card in order summary', () => {
      vi.spyOn(componentService, 'shouldShowDeliveryMode').mockReturnValue(
        true
      );
      const result = component.shouldShowDeliveryMode(mockDeliveryMode);
      expect(result).toEqual(true);
      expect(componentService.shouldShowDeliveryMode).toHaveBeenCalledWith(
        mockDeliveryMode
      );
    });
    it('should not show delivery mode card in order summary', () => {
      vi.spyOn(componentService, 'shouldShowDeliveryMode').mockReturnValue(
        false
      );
      const result = component.shouldShowDeliveryMode(undefined);
      expect(result).toEqual(false);
      expect(componentService.shouldShowDeliveryMode).toHaveBeenCalledWith(
        undefined
      );
    });
  });

  describe('addTitleToAddressCard feature toggle', () => {
    let featureToggles: FeatureToggles;
    const mockDeliveryAddressWithTitle: Address = {
      ...mockDeliveryAddress,
      title: 'Dr.',
    };
    const mockBillingAddressWithTitle: Address = {
      ...mockBillingAddress,
      title: 'Dr.',
    };

    beforeEach(() => {
      vi.spyOn(translationService, 'translate').mockReturnValue(of('test'));
      featureToggles = TestBed.inject(FeatureToggles);
      featureToggles.addTitleToAddressCard = false;
    });

    describe('getAddressCardContent (delivery address)', () => {
      it('should not prefix the title when the toggle is OFF', () => {
        featureToggles.addTitleToAddressCard = false;
        component
          .getAddressCardContent(mockDeliveryAddressWithTitle)
          .subscribe((card) => {
            expect(card.textBold).toEqual('John Smith');
          })
          .unsubscribe();
      });

      it('should prefix the title when the toggle is ON and the address has a title', () => {
        featureToggles.addTitleToAddressCard = true;
        component
          .getAddressCardContent(mockDeliveryAddressWithTitle)
          .subscribe((card) => {
            expect(card.textBold).toEqual('Dr. John Smith');
          })
          .unsubscribe();
      });

      it('should not prefix the title when the toggle is ON but the address has no title', () => {
        featureToggles.addTitleToAddressCard = true;
        component
          .getAddressCardContent(mockDeliveryAddress)
          .subscribe((card) => {
            expect(card.textBold).toEqual('John Smith');
          })
          .unsubscribe();
      });
    });

    describe('getBillingAddressCardContent (billing address)', () => {
      it('should not prefix the title when the toggle is OFF', () => {
        featureToggles.addTitleToAddressCard = false;
        component
          .getBillingAddressCardContent(mockBillingAddressWithTitle)
          .subscribe((card) => {
            expect(card.textBold).toEqual('John Smith');
          })
          .unsubscribe();
      });

      it('should prefix the title when the toggle is ON and the address has a title', () => {
        featureToggles.addTitleToAddressCard = true;
        component
          .getBillingAddressCardContent(mockBillingAddressWithTitle)
          .subscribe((card) => {
            expect(card.textBold).toEqual('Dr. John Smith');
          })
          .unsubscribe();
      });

      it('should not prefix the title when the toggle is ON but the address has no title', () => {
        featureToggles.addTitleToAddressCard = true;
        component
          .getBillingAddressCardContent(mockBillingAddress)
          .subscribe((card) => {
            expect(card.textBold).toEqual('John Smith');
          })
          .unsubscribe();
      });
    });
  });

  it('should render quote code in UI', () => {
    component.order$ = of({ ...mockOrder, sapQuoteCode: '12345' });
    fixture.detectChanges();
    const quoteContainer =
      fixture.nativeElement.querySelector('#quote-container');
    expect(quoteContainer).not.toBeNull();
    const quoteTemplate = quoteContainer.querySelector('.cx-card-title');
    expect(quoteTemplate.textContent).toContain('12345');
    const quoteLink = quoteContainer.querySelector('.cx-card-actions');
    expect(quoteLink.textContent?.trim()).toEqual('orderDetails.quoteDetail');
  });

  it('should not render quote code in UI', () => {
    component.order$ = of({ ...mockOrder });
    fixture.detectChanges();
    const quoteContainer =
      fixture.nativeElement.querySelector('#quote-container');
    expect(quoteContainer).toBeNull();
  });
});
