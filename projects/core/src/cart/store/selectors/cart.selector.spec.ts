import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { CartActions } from '../actions/index';
import { StateWithCart } from '../cart-state';
import * as fromReducers from './../reducers/index';
import { CartSelectors } from './../selectors/index';
import { User } from '../../../model/misc.model';

describe('Cart selectors', () => {
  let store: Store<StateWithCart>;

  const testCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    entries: [{ entryNumber: 0, product: { code: '1234' } }],
    totalPrice: {
      currencyIso: 'USD',
      value: 0,
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      value: 0,
    },
    user: { uid: 'test' },
  };

  const testEmptyCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    totalPrice: {
      currencyIso: 'USD',
      value: 0,
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      value: 0,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithCart>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCartContent', () => {
    it('should return the cart content from the state', () => {
      let result: Cart;
      store
        .pipe(select(CartSelectors.getCartContent))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CartActions.CreateCartSuccess(testEmptyCart));
      expect(result).toEqual(testEmptyCart);
    });
  });

  describe('getCartState', () => {
    it('should return cart state value', () => {
      let result: any;
      store
        .pipe(select(CartSelectors.getCartState))
        .subscribe(value => (result = value));
      expect(result.entries).toBeTruthy();
      expect(result.content).toBeTruthy();
    });
  });

  describe('getCartRefresh', () => {
    it('should return the refresh value', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getCartRefresh))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new CartActions.CartAddEntrySuccess({
          quantity: 1,
        })
      );
      expect(result).toEqual(true);
    });
  });

  describe('getCartLoaded', () => {
    it('should return the loaded value', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getCartLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new CartActions.CreateCart({ userId: 'testUserId' }));
      expect(result).toEqual(false);
    });

    it('should return false when refresh flag is set to true', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getCartLoaded))
        .subscribe(value => (result = value));

      store.dispatch(new CartActions.CreateCartSuccess(testEmptyCart));
      expect(result).toEqual(true);
      store.dispatch(new CartActions.MergeCartSuccess(testEmptyCart));
      expect(result).toEqual(false);
    });
  });

  describe('getCartLoading', () => {
    it('should return the loading value', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getCartLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new CartActions.CreateCart({ userId: 'testUserId' }));
      expect(result).toEqual(true);
    });
  });

  describe('getCartMergeComplete', () => {
    it('should return mergeComplete state', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getCartMergeComplete))
        .subscribe(value => (result = value));

      store.dispatch(new CartActions.MergeCart({}));
      expect(result).toEqual(false);
      store.dispatch(new CartActions.MergeCartSuccess({}));
      expect(result).toEqual(true);
    });
  });

  describe('getCartEntriesMap', () => {
    it('should return the cart entries in map', () => {
      let result: { [code: string]: OrderEntry };
      store
        .pipe(select(CartSelectors.getCartEntriesMap))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CartActions.LoadCartSuccess(testCart));

      expect(result).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } },
      });
    });
  });

  describe('getCartEntrySelectorFactory', () => {
    it('should return entry by productCode', () => {
      let result: OrderEntry;

      store
        .pipe(select(CartSelectors.getCartEntrySelectorFactory('1234')))
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual(undefined);

      store.dispatch(new CartActions.LoadCartSuccess(testCart));

      expect(result).toEqual({ entryNumber: 0, product: { code: '1234' } });
    });
  });

  describe('getCartEntriesList', () => {
    it('should return the list of entries', () => {
      let result: OrderEntry[];
      store
        .pipe(select(CartSelectors.getCartEntries))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new CartActions.LoadCartSuccess(testCart));

      expect(result).toEqual([{ entryNumber: 0, product: { code: '1234' } }]);
    });
  });

  describe('getCartUser', () => {
    it('should return the cart assigned user', () => {
      let result: User;
      store
        .pipe(select(CartSelectors.getCartUser))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new CartActions.LoadCartSuccess(testCart));

      expect(result).toEqual({ uid: 'test' });
    });
  });
});
