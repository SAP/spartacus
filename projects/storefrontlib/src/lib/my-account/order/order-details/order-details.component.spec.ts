import { OrderDetailsComponent } from '../order-details/order-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import { CartService, CartDataService } from '../../../cart/services';
import { RoutingService } from '../../../routing/facade/routing.service';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import * as fromAuth from '../../../auth/store';
import * as fromUserStore from '../../../user/store';

const mockOrder = {
  code: '1',
  statusDisplay: 'Shipped',
  created: 1539028162656,
  consignments: [],
  unconsignedEntries: [],
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

const mockUser = {
  userId: 'test@sap.com'
};

const mockState = {
  state: {
    params: {
      orderCode: '1'
    }
  }
};

function spyOnStore() {
  spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
    switch (selector) {
      case fromAuth.getUserToken:
        return () => of(mockUser);
      case fromUserStore.getOrderDetails:
        return () => of(mockOrder);
    }
  });
}
const mockRoutingService = {
  routerState$: of(mockState)
};
describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let store: NgrxStore.Store<fromUserStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CartSharedModule,
        CardModule,
        NgrxStore.StoreModule.forRoot({}),
        NgrxStore.StoreModule.forFeature('auth', fromAuth.getReducers()),
        NgrxStore.StoreModule.forFeature('order', fromUserStore.getReducers())
      ],
      providers: [
        CartService,
        CartDataService,
        { provide: RoutingService, useValue: mockRoutingService }
      ],
      declarations: [OrderDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(NgrxStore.Store);

    spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the store', () => {
    spyOnStore();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(NgrxStore.select).toHaveBeenCalledWith(
        fromUserStore.getOrderDetails
      );
    });
  });

  it('should order details info bar be not null', () => {
    spyOnStore();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-order-details')
    ).not.toBeNull();
  });

  it('should order details display correct order ID', () => {
    spyOnStore();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-order-details__detail:first-of-type .cx-order-details__value'
      ).textContent
    ).toEqual(mockOrder.code);
  });

  it('should order details display correct order status', () => {
    spyOnStore();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-order-details__detail:last-of-type .cx-order-details__value'
      ).textContent
    ).toEqual(mockOrder.statusDisplay);
  });

  it('should order details display order summary', () => {
    spyOnStore();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-order-summary')
    ).not.toBeNull();
  });

  it('should order details display "ship to" data', () => {
    spyOnStore();
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-card-body__label-container'
      ).textContent
    ).toContain(
      mockOrder.deliveryAddress.firstName &&
        mockOrder.deliveryAddress.lastName &&
        mockOrder.deliveryAddress.line1 &&
        mockOrder.deliveryAddress.line2 &&
        mockOrder.deliveryAddress.town &&
        mockOrder.deliveryAddress.postalCode
    );
  });

  it('should order details display "bill to" data', () => {
    spyOnStore();
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-order-details__account-summary.row > div:nth-child(2)'
      ).textContent
    ).toContain(
      mockOrder.paymentInfo.billingAddress.firstName &&
        mockOrder.paymentInfo.billingAddress.lastName &&
        mockOrder.paymentInfo.billingAddress.line1 &&
        mockOrder.paymentInfo.billingAddress.line2 &&
        mockOrder.paymentInfo.billingAddress.town &&
        mockOrder.paymentInfo.billingAddress.postalCode
    );
  });

  it('should order details display "payment" data', () => {
    spyOnStore();
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-order-details__account-summary.row > div:nth-child(3)'
      ).textContent
    ).toContain(
      mockOrder.paymentInfo.accountHolderName &&
        mockOrder.paymentInfo.cardNumber &&
        mockOrder.paymentInfo.expiryMonth &&
        mockOrder.paymentInfo.expiryYear &&
        mockOrder.paymentInfo.cardType.name
    );
  });

  it('should order details display "shipping" data', () => {
    spyOnStore();
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-order-details__account-summary.row > div:nth-child(4)'
      ).textContent
    ).toContain(
      mockOrder.deliveryMode.name && mockOrder.deliveryMode.description
    );
  });
});
