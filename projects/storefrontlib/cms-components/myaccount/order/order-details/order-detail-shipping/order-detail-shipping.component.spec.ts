import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, Order, ReplenishmentOrder } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailShippingComponent } from './order-detail-shipping.component';

const mockOrder: Order = {
  code: 'test-code-412',
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
};

class MockOrderDetailsService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

describe('OrderDetailShippingComponent', () => {
  let component: OrderDetailShippingComponent;
  let fixture: ComponentFixture<OrderDetailShippingComponent>;
  let orderDetailsService: OrderDetailsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        ],
        declarations: [OrderDetailShippingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailShippingComponent);
    orderDetailsService = TestBed.inject(OrderDetailsService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should be able to get order details', () => {
    let result: any;

    orderDetailsService
      .getOrderDetails()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockOrder);

    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
      of(mockReplenishmentOrder)
    );

    orderDetailsService
      .getOrderDetails()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockReplenishmentOrder);
  });
});
