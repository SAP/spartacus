import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Order,
  ReplenishmentOrder,
  StateUtils,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

const mockState: StateUtils.LoaderState<Order> = {
  loading: false,
  error: false,
  success: true,
  value: mockOrder,
};

const mockStateWithError: StateUtils.LoaderState<Order> = {
  loading: false,
  error: true,
  success: true,
  value: undefined,
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

const mockState$ = new BehaviorSubject(mockState);
const mockOrder$ = new BehaviorSubject(mockOrder);

class MockOrderDetailsService {
  getOrderDetailsState(): Observable<StateUtils.LoaderState<Order>> {
    return mockState$.asObservable();
  }
  getOrderDetails(): Observable<Order> {
    return mockOrder$.asObservable();
  }
}

describe('OrderDetailShippingComponent', () => {
  let component: OrderDetailShippingComponent;
  let fixture: ComponentFixture<OrderDetailShippingComponent>;
  let orderDetailsService: OrderDetailsService;
  let el: DebugElement;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;

    orderDetailsService = TestBed.inject(OrderDetailsService);
  });

  it('should create', () => {
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

  it('should not display order overview when state has error', () => {
    mockState$.next(mockStateWithError);

    fixture.detectChanges();
    const element: DebugElement = el.query(By.css('cx-order-overview'));

    expect(element).toBeFalsy();
  });
});
