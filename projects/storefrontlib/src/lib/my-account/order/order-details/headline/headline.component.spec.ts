import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  RoutingService,
  Cart,
  PromotionResult,
  AuthService,
  UserToken,
  Order,
  UserService
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { HeadlineComponent } from './headline.component';
import { CardModule } from '../../../../ui/components/card/card.module';

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
      isocode: 'UK'
    }
  },
  deliveryMode: {
    name: 'Standard shipping',
    description: '3-5 days'
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa'
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
        isocode: 'UK'
      }
    }
  }
};

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}

class MockUserService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
  loadOrderDetails(_userId: string, _orderCode: string): void {}
  clearOrderDetails(): void {}
}

@Component({
  selector: 'cx-order-summary',
  template: ''
})
class MockOrderSummaryComponent {
  @Input()
  cart: Cart;
}

@Component({
  selector: 'cx-cart-item-list',
  template: ''
})
class MockCartItemListComponent {
  @Input()
  isReadOnly = false;
  @Input()
  hasHeader = true;
  @Input()
  items = [];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
  @Input()
  cartIsLoading = false;
}

describe('OrderDetailsComponent', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;
  let userService: UserService;
  let mockRoutingService: RoutingService;
  let el: DebugElement;

  beforeEach(async(() => {
    mockRoutingService = <RoutingService>{
      getRouterState() {
        return of({
          state: {
            params: {
              orderCode: '1'
            }
          }
        });
      }
    };

    TestBed.configureTestingModule({
      imports: [CardModule],
      providers: [
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ],
      declarations: [
        MockCartItemListComponent,
        MockOrderSummaryComponent,
        HeadlineComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlineComponent);
    el = fixture.debugElement;
    userService = TestBed.get(UserService);

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    spyOn(userService, 'loadOrderDetails').and.stub();

    fixture.detectChanges();
    let order: Order;
    component.order$
      .subscribe(value => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
    expect(userService.loadOrderDetails).toHaveBeenCalledWith('test', '1');
  });

  it('should order details info bar be not null', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-order-details'))).not.toBeNull();
  });

  it('should order details display correct order ID', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-detail:first-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.code);
  });

  it('should order details display correct order status', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-detail:last-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.statusDisplay);
  });

  it('should order details display order summary', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(By.css('cx-order-summary'));
    expect(element).not.toBeNull();
  });

  it('should order details display "ship to" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-card-body__label-container')
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

  it('should order details display "bill to" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-account-summary.row > div:nth-child(2)')
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

  it('should order details display "payment" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-account-summary.row > div:nth-child(3)')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.paymentInfo.accountHolderName &&
        mockOrder.paymentInfo.cardNumber &&
        mockOrder.paymentInfo.expiryMonth &&
        mockOrder.paymentInfo.expiryYear &&
        mockOrder.paymentInfo.cardType.name
    );
  });

  it('should order details display "shipping" data', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-account-summary.row > div:nth-child(4)')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.deliveryMode.name && mockOrder.deliveryMode.description
    );
  });
});
