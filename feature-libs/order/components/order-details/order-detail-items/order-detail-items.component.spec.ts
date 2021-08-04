import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Consignment,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  Order,
  PromotionLocation,
  ReplenishmentOrder,
} from '@spartacus/core';
import { CardModule, PromotionsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderConsignedEntriesComponent } from './order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items.component';

const mockProduct = { product: { code: 'test' } };

const mockOrder: Order = {
  code: '1',
  statusDisplay: 'Shipped',
  deliveryAddress: {
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
  },
  deliveryMode: {
    name: 'Standard order-detail-shipping',
    description: '3-5 days',
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa',
    },
    billingAddress: {
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
    },
  },
  created: new Date('2019-02-11T13:02:58+0000'),
  consignments: [
    {
      code: 'a00000341',
      status: 'READY',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: {}, quantity: 1, shippedQuantity: 1 }],
    },
    {
      code: 'a00000343',
      status: 'DELIVERY_COMPLETED',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: mockProduct, quantity: 4, shippedQuantity: 4 }],
    },
    {
      code: 'a00000348',
      status: 'PICKUP_COMPLETE',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: {}, quantity: 4, shippedQuantity: 4 }],
    },
    {
      code: 'a00000342',
      status: 'CANCELLED',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: {}, quantity: 0, shippedQuantity: 0 }],
    },
    {
      code: 'a00000349',
      status: 'OTHERS',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: {}, quantity: 1, shippedQuantity: 1 }],
    },
  ],
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  appliedOrderPromotions: [
    {
      consumedEntries: [],
      description: 'test-promotion',
      promotion: {
        code: 'test_promotion',
        description: 'A test promotion',
        promotionType: 'Rule Based Promotion',
      },
    },
  ],
};

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input()
  readonly = false;
  @Input()
  hasHeader = true;
  @Input()
  items = [];
  @Input()
  cartIsLoading = false;
  @Input()
  promotionLocation: PromotionLocation = PromotionLocation.Order;
}

@Component({
  selector: 'cx-consignment-tracking',
  template: '',
})
class MockConsignmentTrackingComponent {
  @Input()
  consignment: Consignment;
  @Input()
  orderCode: string;
}

describe('OrderDetailItemsComponent', () => {
  let component: OrderDetailItemsComponent;
  let fixture: ComponentFixture<OrderDetailItemsComponent>;
  let mockOrderDetailsService: OrderDetailsService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      mockOrderDetailsService = <OrderDetailsService>{
        getOrderDetails() {
          return of(mockOrder);
        },
      };

      TestBed.configureTestingModule({
        imports: [
          CardModule,
          I18nTestingModule,
          PromotionsModule,
          FeaturesConfigModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: OrderDetailsService, useValue: mockOrderDetailsService },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.4', consignmentTracking: true },
            },
          },
        ],
        declarations: [
          OrderDetailItemsComponent,
          MockCartItemListComponent,
          MockConsignmentTrackingComponent,
          OrderConsignedEntriesComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailItemsComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize order ', () => {
    fixture.detectChanges();
    let order: Order;
    component.order$
      .subscribe((value) => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
  });

  it('should initialize others and check if it does not allow valid consignment status', () => {
    fixture.detectChanges();
    let others: Consignment[];
    component.others$
      .subscribe((value) => {
        others = value;
      })
      .unsubscribe();

    expect(others).not.toContain(mockOrder.consignments[1]);
    expect(others).not.toContain(mockOrder.consignments[2]);
    expect(others).not.toContain(mockOrder.consignments[3]);
  });

  it('should initialize others and check if it contains any consignment status', () => {
    fixture.detectChanges();
    let others: Consignment[];
    component.others$
      .subscribe((value) => {
        others = value;
      })
      .unsubscribe();

    expect(others).toContain(mockOrder.consignments[0]);
    expect(others).toContain(mockOrder.consignments[4]);
  });

  it('should initialize completed', () => {
    fixture.detectChanges();
    let completed: Consignment[];
    component.completed$
      .subscribe((value) => {
        completed = value;
      })
      .unsubscribe();

    expect(completed).toContain(mockOrder.consignments[1]);
    expect(completed).toContain(mockOrder.consignments[2]);
  });

  it('should initialize cancel', () => {
    fixture.detectChanges();
    let cancel: Consignment[];
    component.cancel$
      .subscribe((value) => {
        cancel = value;
      })
      .unsubscribe();
    expect(cancel).toContain(mockOrder.consignments[3]);
  });

  it('should order details item be rendered', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-list'))).toBeTruthy();
  });

  it('should show promotions on replenishment details', () => {
    spyOn(mockOrderDetailsService, 'getOrderDetails').and.returnValue(
      of(mockReplenishmentOrder)
    );
    fixture.detectChanges();
    let order: ReplenishmentOrder;
    mockOrderDetailsService
      .getOrderDetails()
      .subscribe((value) => (order = value))
      .unsubscribe();
    expect(order).toEqual(mockReplenishmentOrder);
    expect(el.query(By.css('.cx-promotions'))).toBeTruthy();
  });
});
