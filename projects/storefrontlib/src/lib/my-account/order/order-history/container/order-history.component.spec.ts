import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PaginationAndSortingComponent } from './../pagination-and-sorting/pagination-and-sorting.component';
import { OrderHistoryComponent } from './order-history.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../../routing/store';
import * as fromUserStore from '../../../../user/store';
import { yDate } from '../../../../pipes/yDate';

describe('OrderHistoryControlsComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let store: Store<fromUserStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          orders: combineReducers(fromUserStore.reducers)
        })
      ],
      declarations: [
        OrderHistoryComponent,
        PaginationAndSortingComponent,
        yDate
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValues(
      of({ userId: 'test@sap.com' }),
      of({ orders: [], pagination: {}, sort: [] })
    );
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the store', () => {
    component.ngOnInit();
    const action = new fromUserStore.LoadUserOrders({
      userId: 'test@sap.com',
      pageSize: 5
    });

    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(store.select).toHaveBeenCalledWith(fromUserStore.getOrders);
  });
});
