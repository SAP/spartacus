import { OrderDetailsComponent } from '../order-details/order-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../bootstrap.module';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { OrderHistoryComponent } from './order-history.component';
import { CartService, CartDataService } from '../../../cart/services';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';
import * as fromRoot from '../../../routing/store';
import * as fromUserStore from '../../../user/store';
import * as fromAuthStore from '../../../auth/store';
import createSpy = jasmine.createSpy;
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { CardModule } from '../../../ui/components/card/card.module';

const routes = [
  { path: 'my-account/orders/:id', component: OrderDetailsComponent }
];
const mockOrders = {
  orders: [
    { code: 1, placed: 1, statusDisplay: 'test', total: { formattedValue: 1 } }
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }]
};
const mockAuth = {
  userToken$: of({ access_token: 'test', userId: 'test@sap.com' }),
  authorize: createSpy()
};

function spyOnStore(customSpiesFn?) {
  spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
    if (customSpiesFn) {
      return customSpiesFn(selector);
    }
    switch (selector) {
      case fromUserStore.getOrders:
        return () => of(mockOrders);
      case fromUserStore.getOrdersLoaded:
        return () => of(true);
    }
  });
}

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let store: NgrxStore.Store<fromUserStore.UserState>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        PaginationAndSortingModule,
        FormsModule,
        CartSharedModule,
        CardModule,
        NgrxStore.StoreModule.forRoot({
          ...fromRoot.getReducers(),
          orders: NgrxStore.combineReducers(fromUserStore.getReducers())
        }),
        NgSelectModule,
        BootstrapModule
      ],
      declarations: [OrderHistoryComponent, OrderDetailsComponent],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        [CartService, CartDataService]
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    store = TestBed.get(NgrxStore.Store);
    routingService = TestBed.get(RoutingService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the store', () => {
    spyOnStore();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(NgrxStore.select).toHaveBeenCalledWith(fromUserStore.getOrders);
    });
  });

  it('should redirect when clicking on order id', () => {
    spyOnStore();
    spyOn(routingService, 'go');
    fixture.detectChanges();
    const elem = fixture.debugElement.nativeElement.querySelector(
      '.y-order-history__table tbody tr'
    );
    elem.click();

    fixture.whenStable().then(() => {
      expect(routingService.go).toHaveBeenCalledWith(['my-account/orders/', 1]);
    });
  });

  it('should display No orders found page if no orders are found', () => {
    spyOnStore(selector => {
      switch (selector) {
        case fromUserStore.getOrders:
          return () => of({ orders: [], pagination: { totalResults: 0 } });
        case fromUserStore.getOrdersLoaded:
          return () => of(true);
        case fromAuthStore.getUserToken:
          return () => of({ userId: 'test@sap.com' });
      }
    });

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-history__no-order'
      )
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    spyOnStore();
    fixture.detectChanges();
    component.changeSortCode('byOrderNumber');
    expect(component.sortType).toBe('byOrderNumber');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromUserStore.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5,
        currentPage: 0,
        sort: 'byOrderNumber'
      })
    );
  });

  it('should set correctly page', () => {
    spyOnStore();
    fixture.detectChanges();
    component.pageChange(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromUserStore.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5,
        currentPage: 1,
        sort: 'byDate'
      })
    );
  });
});
