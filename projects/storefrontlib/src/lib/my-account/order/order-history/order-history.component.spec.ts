import { OrderDetailsComponent } from '../order-details/order-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../bootstrap.module';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { OrderHistoryComponent } from './order-history.component';
import * as fromRoot from '../../../routing/store';
import * as fromUserStore from '../../../user/store';
import createSpy = jasmine.createSpy;
import { AuthService } from '../../../auth/facade/auth.service';

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

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let store: Store<fromUserStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        PaginationAndSortingModule,
        FormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          orders: combineReducers(fromUserStore.getReducers())
        }),
        NgSelectModule,
        BootstrapModule
      ],
      declarations: [OrderHistoryComponent, OrderDetailsComponent],
      providers: [{ provide: AuthService, useValue: mockAuth }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the store', () => {
    spyOn(store, 'select').and.returnValues(of(mockOrders), of(true));
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromUserStore.getOrders);
  });

  it('should redirect when clicking on order id', () => {
    spyOn(store, 'select').and.returnValues(of(mockOrders), of(true));

    fixture.detectChanges();
    const elem = fixture.debugElement.nativeElement.querySelector(
      '.y-order-history__table tbody tr'
    );
    elem.click();

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromRoot.Go({
          path: ['my-account/orders/', 1]
        })
      );
    });
  });

  it('should display No orders found page if no orders are found', () => {
    spyOn(store, 'select').and.returnValues(
      of({ orders: [], pagination: { totalResults: 0 } }),
      of(true)
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-history__no-order'
      )
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    spyOn(store, 'select').and.returnValues(of(mockOrders), of(true));
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
    spyOn(store, 'select').and.returnValues(of(mockOrders), of(true));
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
