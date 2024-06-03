import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Cart, CartType } from '@spartacus/cart/base/root';
import { take } from 'rxjs/operators';
import { MultiCartSelectors } from '.';
import { CartActions } from '../actions';
import { MULTI_CART_FEATURE, StateWithMultiCart } from '../multi-cart-state';
import * as fromReducers from './../reducers/index';

describe('Multi Cart selectors', () => {
  let store: Store<StateWithMultiCart>;

  const testCart: Cart = {
    code: 'xxx',
    guid: 'xxx',
    totalItems: 0,
    entries: [
      { entryNumber: 0, product: { code: '1234' } },
      { entryNumber: 1, product: { code: '01234' } },
      { entryNumber: 2, product: { code: '3234' } },
    ],
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

  const testCart2: Cart = {
    code: 'xxx-x',
    guid: 'xxx',
    totalItems: 0,
    entries: [
      { entryNumber: 0, product: { code: '1234' } },
      { entryNumber: 1, product: { code: '01234' } },
      { entryNumber: 2, product: { code: '3234' } },
    ],
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

  const mockCarts = [testCart, testCart2];

  function loadCart() {
    store.dispatch(
      new CartActions.LoadCartSuccess({
        cart: testCart,
        userId: 'userId',
        extraData: {
          active: true,
        },
        cartId: testCart.code,
      })
    );
    store.dispatch(
      new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: testCart.code,
      })
    );
  }

  function loadCarts() {
    store.dispatch(new CartActions.LoadCartsSuccess(mockCarts));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromReducers.getMultiCartReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getMultiCartState', () => {
    it('should return multi-cart branch of the store', () => {
      let result;
      store
        .pipe(select(MultiCartSelectors.getMultiCartState))
        .subscribe((value) => (result = value));

      expect(result).toEqual({
        index: { Active: '' },
        carts: {
          entities: {},
        },
      });

      loadCart();

      expect(result).toEqual({
        index: { Active: testCart.code },
        carts: {
          entities: {
            [testCart.code]: {
              value: testCart,
              success: true,
              error: false,
              loading: false,
              processesCount: 0,
            },
          },
        },
      });
    });
  });

  describe('getMultiCartEntities', () => {
    it('should return cart entities', () => {
      let result;
      store
        .pipe(select(MultiCartSelectors.getMultiCartEntities))
        .subscribe((value) => (result = value));

      expect(result).toEqual({
        entities: {},
      });

      loadCart();

      expect(result).toEqual({
        entities: {
          [testCart.code]: {
            value: testCart,
            success: true,
            error: false,
            loading: false,
            processesCount: 0,
          },
        },
      });
    });
  });

  describe('getCartEntitySelectorFactory', () => {
    it('should return cart entity with passed id', () => {
      let result;
      store
        .pipe(
          select(MultiCartSelectors.getCartEntitySelectorFactory(testCart.code))
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: undefined,
        processesCount: 0,
      });

      loadCart();

      expect(result).toEqual({
        value: testCart,
        success: true,
        error: false,
        loading: false,
        processesCount: 0,
      });
    });
  });

  describe('getCartSelectorFactory', () => {
    it('should return cart with passed id', () => {
      let result;
      store
        .pipe(select(MultiCartSelectors.getCartSelectorFactory(testCart.code)))
        .subscribe((value) => (result = value));

      expect(result).toEqual(undefined);

      loadCart();

      expect(result).toEqual(testCart);
    });
  });

  describe('getCartIsStableSelectorFactory', () => {
    it('should return true when cart is stable when there is no active cart', (done) => {
      store
        .pipe(
          select(
            MultiCartSelectors.getCartIsStableSelectorFactory(testCart.code)
          ),
          take(1)
        )
        .subscribe((result) => {
          expect(result).toEqual(true);
          done();
        });
    });

    it('should return true when cart is stable when there are 0 processes and loading is false', (done) => {
      loadCart();

      store
        .pipe(
          select(
            MultiCartSelectors.getCartIsStableSelectorFactory(testCart.code)
          ),
          take(1)
        )
        .subscribe((result) => {
          expect(result).toEqual(true);
          done();
        });
    });

    it('should return false when there are pending processes', (done) => {
      store.dispatch(
        new CartActions.LoadCart({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cartId: testCart.code,
        })
      );

      store
        .pipe(
          select(
            MultiCartSelectors.getCartIsStableSelectorFactory(testCart.code)
          ),
          take(1)
        )
        .subscribe((result) => {
          expect(result).toEqual(false);
          done();
        });
    });
  });

  describe('getCartHasPendingProcessesSelectorFactory', () => {
    it('should return cart stability flag', () => {
      let result;
      store
        .pipe(
          select(
            MultiCartSelectors.getCartHasPendingProcessesSelectorFactory(
              testCart.code
            )
          )
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new CartActions.CartProcessesIncrement(testCart.code));

      expect(result).toEqual(true);
    });
  });

  describe('getCartEntriesSelectorFactory', () => {
    it('should return cart entries', () => {
      let result;
      store
        .pipe(
          select(
            MultiCartSelectors.getCartEntriesSelectorFactory(testCart.code)
          )
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      loadCart();

      expect(result).toEqual(testCart.entries);
    });
  });

  describe('getCartEntrySelectorFactory', () => {
    it('should return cart entry', () => {
      let result;
      store
        .pipe(
          select(
            MultiCartSelectors.getCartEntrySelectorFactory(
              testCart.code,
              testCart.entries[0].product.code
            )
          )
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual(undefined);

      loadCart();

      expect(result).toEqual(testCart.entries[0]);
    });
  });

  describe('getCartsSelectorFactory', () => {
    it('should return list of cart for entry', () => {
      let result;
      store
        .pipe(select(MultiCartSelectors.getCartsSelectorFactory))
        .subscribe((value) => (result = value));

      expect(result?.length).toEqual(0);

      loadCarts();

      expect(result.length).toEqual(2);
    });
  });

  describe('getCartTypeIndex', () => {
    it('should return cartTypeIndex state', () => {
      let result;
      store
        .pipe(select(MultiCartSelectors.getCartTypeIndex))
        .subscribe((value) => (result = value));

      expect(result).toEqual({ Active: '' });

      store.dispatch(
        new CartActions.SetCartTypeIndex({
          cartType: CartType.ACTIVE,
          cartId: 'testId',
        })
      );

      expect(result).toEqual({
        Active: 'testId',
      });
    });
  });

  describe('getCartIdByTypeFactory', () => {
    it('should return cartId by cart type', () => {
      let result;
      store
        .pipe(
          select(MultiCartSelectors.getCartIdByTypeFactory(CartType.ACTIVE))
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual('');

      store.dispatch(
        new CartActions.SetCartTypeIndex({
          cartType: CartType.ACTIVE,
          cartId: 'testId',
        })
      );

      expect(result).toEqual('testId');
    });
  });
});
