import { OrderDetailsComponent } from '../order-details/order-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../bootstrap.module';
import { CartService, CartDataService } from '../../../cart/services';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import * as fromAuth from '../../../auth/store';
import * as fromRoot from '../../../routing/store';
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
    name: 'Standard shipping'
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026'
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

const mockOrderDetails = store => {
  spyOn(store, 'select').and.returnValues(
    of(mockUser),
    of(mockState),
    of(mockOrder)
  );
};

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let store: Store<fromUserStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CartSharedModule,
        CardModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromAuth.getReducers()),
          order: combineReducers(fromUserStore.getReducers())
        }),
        NgSelectModule,
        BootstrapModule
      ],
      providers: [CartService, CartDataService],
      declarations: [OrderDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the store', () => {
    mockOrderDetails(store);
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromUserStore.getOrderDetails);
  });

  it('should order details info bar be not null', () => {
    mockOrderDetails(store);
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.y-order-details')
    ).not.toBeNull();
  });

  it('should order details display correct order ID', () => {
    mockOrderDetails(store);
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-details__detail:first-of-type .y-order-details__value'
      ).textContent
    ).toEqual(mockOrder.code);
  });

  it('should order details display correct order status', () => {
    mockOrderDetails(store);
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-details__detail:last-of-type .y-order-details__value'
      ).textContent
    ).toEqual(mockOrder.statusDisplay);
  });

  it('should order details display order summary', () => {
    mockOrderDetails(store);
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.y-order-summary')
    ).not.toBeNull();
  });

  it('should order details display "ship to" data', () => {
    mockOrderDetails(store);
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-card-body__label-container'
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

  it('should order details display "shipping" data', () => {
    mockOrderDetails(store);
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-details__account-summary.row > div:nth-child(2)'
      ).textContent
    ).toContain(mockOrder.deliveryMode.name);
  });

  it('should order details display "payment" data', () => {
    mockOrderDetails(store);
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-details__account-summary.row > div:nth-child(3)'
      ).textContent
    ).toContain(
      mockOrder.paymentInfo.accountHolderName &&
        mockOrder.paymentInfo.cardNumber &&
        mockOrder.paymentInfo.expiryMonth &&
        mockOrder.paymentInfo.expiryYear
    );
  });
});
