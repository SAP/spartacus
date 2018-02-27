import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { TestBed } from '@angular/core/testing';
import { Cart } from '../../models/cart-types.model';

fdescribe('Cart selectors', () => {
  let store: Store<fromReducers.CartState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCartContentState', () => {
    it('should return a cart from the state', () => {
      let result: Cart;
      store
        .select(fromSelectors.getCartContentState)
        .subscribe(value => (result = value));

      expect(result).toEqual(<Cart>{});

      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        total_items: 0,
        total_price: {
          currency_iso: 'USD',
          value: 0
        },
        total_price_with_tax: {
          currency_iso: 'USD',
          value: 0
        }
      };
      store.dispatch(new fromActions.CreateCartSuccess(testCart));

      expect(result).toEqual(testCart);
    });
  });
});
