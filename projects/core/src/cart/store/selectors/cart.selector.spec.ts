import { Store, StoreModule, select } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { Cart, OrderEntry } from '@spartacus/core';

import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { StateWithCart } from '../cart-state';

describe('Cart selectors', () => {
  let store: Store<StateWithCart>;

  const testCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    entries: [{ entryNumber: 0, product: { code: '1234' } }],
    totalPrice: {
      currencyIso: 'USD',
      value: 0
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      value: 0
    }
  };

  const testEmptyCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    totalPrice: {
      currencyIso: 'USD',
      value: 0
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      value: 0
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getActiveCartContent', () => {
    it('should return the cart content from the state', () => {
      let result: Cart;
      store
        .pipe(select(fromSelectors.getCartContent))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.CreateCartSuccess(testEmptyCart));
      expect(result).toEqual(testEmptyCart);
    });
  });

  describe('getRefresh', () => {
    it('should return the refresh value', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getRefresh))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new fromActions.AddEntrySuccess({
          userId: 'testUserId',
          cartId: 'testCartId',
          productCode: 'testProductCode',
          quantity: 1
        })
      );
      expect(result).toEqual(true);
    });
  });

  describe('getLoaded', () => {
    it('should return the loaded value', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.CreateCart(testEmptyCart));
      expect(result).toEqual(false);
    });
  });

  describe('getEntriesMap', () => {
    it('should return the cart entries in map', () => {
      let result: { [code: string]: OrderEntry };
      store
        .pipe(select(fromSelectors.getEntriesMap))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadCartSuccess(testCart));

      expect(result).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } }
      });
    });
  });

  describe('getEntrySelectorFactory', () => {
    it('should return entry by productCode', () => {
      let result: OrderEntry;

      store
        .pipe(select(fromSelectors.getEntrySelectorFactory('1234')))
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadCartSuccess(testCart));

      expect(result).toEqual({ entryNumber: 0, product: { code: '1234' } });
    });
  });

  describe('getEntriesList', () => {
    it('should return the list of entries', () => {
      let result: OrderEntry[];
      store
        .pipe(select(fromSelectors.getEntries))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCartSuccess(testCart));

      expect(result).toEqual([{ entryNumber: 0, product: { code: '1234' } }]);
    });
  });
});
