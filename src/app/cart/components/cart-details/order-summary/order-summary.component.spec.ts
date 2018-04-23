import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
import * as fromUserStore from '../../../../user/store';
import * as fromRoot from '../../../../routing/store';
import { OrderSummaryComponent } from './order-summary.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { CartService } from '../../../../cart/services';

describe('OrderSummary', () => {
  let store: Store<fromCartStore.CartState>;
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let service: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCartStore.reducers),
          user: combineReducers(fromUserStore.reducers)
        })
      ],
      declarations: [OrderSummaryComponent],
      providers: [CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
