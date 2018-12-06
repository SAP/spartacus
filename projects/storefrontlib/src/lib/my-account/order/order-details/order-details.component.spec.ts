import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import createSpy = jasmine.createSpy;
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { CardModule } from '../../../ui/components/card/card.module';
import {
  RoutingService,
  Cart,
  PromotionResult,
  AuthService,
  UserToken,
  Order,
  UserService
} from '@spartacus/core';

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}

const mockOrder = {
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
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let mockRoutingService: RoutingService;
  let mockUserService: any;
  let el: DebugElement;

  beforeEach(async(() => {
    mockRoutingService = <RoutingService>{
      routerState$: of({
        state: {
          params: {
            orderCode: '1'
          }
        }
      })
    };
    mockUserService = {
      orderDetails$: of(mockOrder),
      loadOrderDetails: createSpy(),
      clearOrderDetails: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [CardModule],
      providers: [
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ],
      declarations: [
        MockCartItemListComponent,
        MockOrderSummaryComponent,
        OrderDetailsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    fixture.detectChanges();
    let order: Order;
    component.order$.subscribe(value => {
      order = value;
    });
    expect(order).toEqual(mockOrder);
    expect(mockUserService.loadOrderDetails).toHaveBeenCalledWith('test', '1');
  });

  it('should order details info bar be not null', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-order-details'))).not.toBeNull();
  });

  it('should order details display correct order ID', () => {
    fixture.detectChanges();
    const element = el.query(
      By.css('.cx-order-details__detail:first-of-type .cx-order-details__value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.code);
  });

  it('should order details display correct order status', () => {
    fixture.detectChanges();
    const element = el.query(
      By.css('.cx-order-details__detail:last-of-type .cx-order-details__value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.statusDisplay);
  });

  it('should order details display order summary', () => {
    fixture.detectChanges();
    const element = el.query(By.css('cx-order-summary'));
    expect(element).not.toBeNull();
  });

  it('should order details display "ship to" data', () => {
    fixture.detectChanges();
    const element = el.query(By.css('.cx-card-body__label-container'));
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
    const element = el.query(
      By.css('.cx-order-details__account-summary.row > div:nth-child(2)')
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
    const element = el.query(
      By.css('.cx-order-details__account-summary.row > div:nth-child(3)')
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
    const element = el.query(
      By.css('.cx-order-details__account-summary.row > div:nth-child(4)')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.deliveryMode.name && mockOrder.deliveryMode.description
    );
  });
});
