import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromCartStore from '../../../../cart/store';
import * as fromAuthStore from '../../../../auth/store';
import * as fromRoot from '../../../../routing/store';
import { OrderSummaryComponent } from './order-summary.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService } from '../../../services';
import { of } from 'rxjs/observable/of';
import { CartService } from '../../../../cart/services';

describe('OrderSummary', () => {
  let store: Store<fromCartStore.CartState>;
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let service: CheckoutService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cart: combineReducers(fromCartStore.reducers),
            user: combineReducers(fromAuthStore.reducers)
          })
        ],
        declarations: [OrderSummaryComponent],
        providers: [CheckoutService, CartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    const mockCart = {
      code: 'mockId'
    };

    spyOn(store, 'select').and.returnValue(of(mockCart));
    spyOn(service, 'loadCartDetails').and.callThrough();

    component.ngOnInit();

    expect(service.loadCartDetails).toHaveBeenCalled();

    expect(store.select).toHaveBeenCalledWith(fromCartStore.getActiveCart);
  });
});
