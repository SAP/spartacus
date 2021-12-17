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
} from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { OrderConsignedEntriesComponent } from './order-consigned-entries.component';

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
      status: 'SHIPPED',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [
        {
          orderEntry: mockProduct,
          quantity: 1,
          shippedQuantity: 1,
        },
      ],
    },
  ],
};

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input() readonly = false;
  @Input() items = [];
  @Input() promotionLocation: PromotionLocation = PromotionLocation.Order;
}

@Component({
  selector: 'cx-consignment-tracking',
  template: '',
})
class MockConsignmentTrackingComponent {
  @Input() consignment: Consignment;
  @Input() orderCode: string;
}

describe('OrderConsignedEntriesComponent', () => {
  let component: OrderConsignedEntriesComponent;
  let fixture: ComponentFixture<OrderConsignedEntriesComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CardModule,
          I18nTestingModule,
          FeaturesConfigModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.4', consignmentTracking: true },
            },
          },
        ],
        declarations: [
          OrderConsignedEntriesComponent,
          MockCartItemListComponent,
          MockConsignmentTrackingComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConsignedEntriesComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    component.order = mockOrder;
    component.consignments = mockOrder.consignments;
    component.promotionLocation = PromotionLocation.Order;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return getConsignmentProducts', () => {
    const products = component.getConsignmentProducts(
      mockOrder.consignments[0]
    );
    expect(products).toEqual([mockProduct]);
  });

  it('should order consignment entries be rendered', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-list'))).toBeTruthy();
  });
});
