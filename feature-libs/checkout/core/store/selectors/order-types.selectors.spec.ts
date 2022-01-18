import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ORDER_TYPE } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import {
  CHECKOUT_FEATURE,
  OrderTypesState,
  StateWithCheckout,
} from '../checkout-state';
import * as fromReducers from '../reducers/index';
import { CheckoutSelectors } from '../selectors/index';

describe('OrderTypesSelectors', () => {
  let store: Store<StateWithCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    store.dispatch(new CheckoutActions.SetOrderType(ORDER_TYPE.PLACE_ORDER));
  });

  describe('getOrderTypesState', () => {
    it('should return the order type state', () => {
      let result: OrderTypesState;

      store
        .pipe(select(CheckoutSelectors.getOrderTypesState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({ selected: ORDER_TYPE.PLACE_ORDER });
    });
  });

  describe('getSelectedOrderType', () => {
    it('should return the selected order type', () => {
      let result: ORDER_TYPE;

      store
        .pipe(select(CheckoutSelectors.getSelectedOrderType))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(ORDER_TYPE.PLACE_ORDER);
    });
  });
});
