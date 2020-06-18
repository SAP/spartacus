import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Order } from '@spartacus/core';
import { of } from 'rxjs';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailShippingComponent } from './order-detail-shipping.component';

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
      entries: [{ orderEntry: {}, quantity: 1, shippedQuantity: 1 }],
    },
  ],
};

const mockB2BOrder = {
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

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

describe('OrderDetailShippingComponent', () => {
  let component: OrderDetailShippingComponent;
  let fixture: ComponentFixture<OrderDetailShippingComponent>;
  let orderDetailsService: OrderDetailsService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CardModule, I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
      ],
      declarations: [OrderDetailShippingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailShippingComponent);
    el = fixture.debugElement;

    orderDetailsService = TestBed.inject(OrderDetailsService);

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    fixture.detectChanges();
    let order: Order;
    component.order$
      .subscribe((value) => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
  });

  it('should render shipping card', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-account-summary'))).toBeTruthy();
  });

  it('should display "ship to" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('div:nth-child(1) > cx-card .cx-card-label-container')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.deliveryAddress.firstName &&
        mockOrder.deliveryAddress.lastName &&
        mockOrder.deliveryAddress.line1 &&
        mockOrder.deliveryAddress.line2 &&
        mockOrder.deliveryAddress.town &&
        mockOrder.deliveryAddress.postalCode
    );
  });

  it('should display "bill to" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('div:nth-child(2) > cx-card .cx-card-label-container')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.paymentInfo.billingAddress.firstName &&
        mockOrder.paymentInfo.billingAddress.lastName &&
        mockOrder.paymentInfo.billingAddress.line1 &&
        mockOrder.paymentInfo.billingAddress.line2 &&
        mockOrder.paymentInfo.billingAddress.town &&
        mockOrder.paymentInfo.billingAddress.postalCode
    );
  });

  it('should display "payment" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('div:nth-child(3) > cx-card .cx-card-label-container')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.paymentInfo.accountHolderName &&
        mockOrder.paymentInfo.cardNumber &&
        mockOrder.paymentInfo.expiryMonth &&
        mockOrder.paymentInfo.expiryYear &&
        mockOrder.paymentInfo.cardType.name
    );
  });

  it('should display "shipping" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('div:nth-child(4) > cx-card .cx-card-label-container')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.deliveryMode.name && mockOrder.deliveryMode.description
    );
  });

  it('should display "account payment" data', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
      of(mockB2BOrder)
    );

    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('div:nth-child(4) > cx-card .cx-card-label-container')
    );
    expect(element.nativeElement.textContent).toContain(
      mockB2BOrder.purchaseOrderNumber &&
        mockB2BOrder.costCenter &&
        mockB2BOrder.costCenter.unit.name
    );
  });

  it('should display "shipping" data column after "account payment" column when costCenter is available', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
      of(mockB2BOrder)
    );

    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('div:nth-child(5) > cx-card .cx-card-label-container')
    );

    expect(element.nativeElement.textContent).toContain(
      mockB2BOrder.deliveryMode.name && mockB2BOrder.deliveryMode.description
    );
  });
});
