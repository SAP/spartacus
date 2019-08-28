import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CartActions } from '../actions/index';
import { StateWithCart } from '../cart-state';
import * as fromReducers from './../reducers';
import { CartSelectors } from './../selectors/index';
import { OrderEntry } from '../../../model/order.model';
import { Cart } from '../../../model/cart.model';

describe('Select cart selectors', () => {
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

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSaveForLaterContent', () => {
    it('should return the save for later content', () => {
      let result: Cart;
      store
        .pipe(select(CartSelectors.getSaveForLaterContent))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CartActions.CreateSaveForLaterSuccess(testEmptyCart));
      expect(result).toEqual(testEmptyCart);
    });
  });

  describe('getSaveForLaterRefresh', () => {
    it('should return the refresh value', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getSaveForLaterRefresh))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new CartActions.CartAddEntrySuccess({
          userId: 'testUserId',
          cartId: 'testCartId',
          productCode: 'testProductCode',
          quantity: 1,
        })
      );
      expect(result).toEqual(true);
    });
  });

  describe('getSaveForLaterLoaded', () => {
    it('should return the loaded value', () => {
      let result: boolean;
      store
        .pipe(select(CartSelectors.getSaveForLaterLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new CartActions.CreateSaveForLater(testEmptyCart));
      expect(result).toEqual(false);
    });
  });

  describe('getSaveForLaterEntriesMap', () => {
    it('should return the save for later entries in map', () => {
      let result: { [code: string]: OrderEntry };
      store
        .pipe(select(CartSelectors.getSaveForLaterEntriesMap))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CartActions.LoadSaveForLaterSuccess(testCart));

      expect(result).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } },
      });
    });
  });

  describe('getSaveForLaterEntrySelectorFactory', () => {
    it('should return entry by productCode', () => {
      let result: OrderEntry;

      store
        .pipe(select(CartSelectors.getSaveForLaterEntrySelectorFactory('1234')))
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual(undefined);

      store.dispatch(new CartActions.LoadSaveForLaterSuccess(testCart));

      expect(result).toEqual({ entryNumber: 0, product: { code: '1234' } });
    });
  });

  describe('getSaveForLaterEntries', () => {
    it('should return the list of entries', () => {
      let result: OrderEntry[];
      store
        .pipe(select(CartSelectors.getSaveForLaterEntries))
        .subscribe(value => (result = value));
      expect(result).toEqual([]);
      store.dispatch(new CartActions.LoadSaveForLaterSuccess(testCart));
      expect(result).toEqual([{ entryNumber: 0, product: { code: '1234' } }]);
    });
  });
});
