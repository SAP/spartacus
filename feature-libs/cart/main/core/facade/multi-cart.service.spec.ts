import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserIdService } from '../../auth';
import * as fromReducers from '../../cart/store/reducers/index';
import { Cart } from '../../model/cart.model';
import { CartActions } from '../store/actions';
import {
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '../store/multi-cart-state';
import { MultiCartService } from './multi-cart.service';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

const testCart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  entries: [
    { entryNumber: 0, product: { code: '1234' } },
    { entryNumber: 1, product: { code: '1234' } },
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
    { entryNumber: 1, product: { code: '1234' } },
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
const mockCarts: Cart[] = [testCart, testCart2];

const userId = 'currentUserId';
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.callFake(() => {
    return of(userId);
  });
}

describe('MultiCartService', () => {
  let service: MultiCartService;
  let store: Store<StateWithMultiCart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromReducers.getMultiCartReducers()
        ),
      ],
      providers: [
        MultiCartService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(MultiCartService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCart', () => {
    it('should return cart with given id', () => {
      let result;
      service.getCart('xxx').subscribe((cart) => {
        result = cart;
      });

      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toEqual(testCart);
    });
  });

  describe('getCarts', () => {
    it('should return cart list of carts', () => {
      let result: Cart[] | undefined;

      service.getCarts().subscribe((carts) => {
        result = carts;
      });

      expect(result?.length).toEqual(0);

      store.dispatch(new CartActions.LoadCartsSuccess(mockCarts));
      expect(result?.length).toEqual(2);
    });
  });

  describe('getCartEntity', () => {
    it('should return cart entity with given id', () => {
      let result;
      service.getCartEntity('xxx').subscribe((cartEntity) => {
        result = cartEntity;
      });

      expect(result).toEqual({
        loading: false,
        success: false,
        error: false,
        value: undefined,
        processesCount: 0,
      });

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toEqual({
        loading: false,
        success: true,
        error: false,
        value: testCart,
        processesCount: 0,
      });
    });
  });

  describe('getLastEntry', () => {
    it('should return last cart entry', () => {
      let result;
      service.getLastEntry('xxx', '1234').subscribe((cart) => {
        result = cart;
      });

      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toEqual(testCart.entries[1]);
    });

    it('should return undefined in case product is not available in cart', () => {
      let result;
      service.getLastEntry('xxx', 'notAvailable').subscribe((cart) => {
        result = cart;
      });

      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toBeUndefined();
    });
  });

  describe('isStable', () => {
    it('should return true when cart is stable', (done) => {
      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );
      service
        .isStable('xxx')
        .pipe(take(1))
        .subscribe((isStable) => {
          expect(isStable).toBe(true);
          done();
        });
    });

    it('should return false when there are pending processes', (done) => {
      store.dispatch(
        new CartActions.LoadCart({
          userId: 'userId',
          cartId: 'xxx',
        })
      );
      service
        .isStable('cartId')
        .subscribe((isStable) => {
          expect(isStable).toBe(false);
          done();
        })
        .unsubscribe();
    });
  });

  describe('createCart', () => {
    it('should create cart and return observable with cart', () => {
      spyOn(service as any, 'generateTempCartId').and.returnValue('temp-uuid');

      const results = [];

      service.createCart({ userId: 'userId' }).subscribe((cart) => {
        results.push(cart);
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CreateCart({
          userId: 'userId',
          extraData: undefined,
          oldCartId: undefined,
          toMergeCartGuid: undefined,
          tempCartId: 'temp-uuid',
        })
      );

      expect(results[0]).toEqual({
        loading: true,
        error: false,
        success: false,
        value: undefined,
        processesCount: 0,
      });

      store.dispatch(
        new CartActions.SetTempCart({
          cart: testCart,
          tempCartId: 'temp-uuid',
        })
      );

      expect(results[1]).toEqual({
        processesCount: 0,
        loading: false,
        error: false,
        success: true,
        value: testCart,
      });
    });
  });

  describe('mergeToCurrentCart', () => {
    it('should merge cart', () => {
      spyOn(service as any, 'generateTempCartId').and.returnValue('temp-uuid');

      service.mergeToCurrentCart({
        userId: 'userId',
        cartId: 'cartId',
        extraData: {},
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.MergeCart({
          userId: 'userId',
          extraData: {},
          cartId: 'cartId',
          tempCartId: 'temp-uuid',
        })
      );
    });
  });

  describe('loadCart', () => {
    it('should dispatch load cart action', () => {
      service.loadCart({
        cartId: 'cartId',
        userId: 'userId',
        extraData: {
          active: true,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadCart({
          cartId: 'cartId',
          userId: 'userId',
          extraData: {
            active: true,
          },
        })
      );
    });
  });

  describe('getEntries', () => {
    it('should return cart entries', () => {
      let result;
      service.getEntries('xxx').subscribe((cart) => {
        result = cart;
      });

      expect(result).toEqual([]);

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toEqual(testCart.entries);
    });
  });

  describe('addEntry', () => {
    it('should dispatch addEntry action', () => {
      service.addEntry('userId', 'cartId', 'productCode', 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartAddEntry({
          cartId: 'cartId',
          userId: 'userId',
          productCode: 'productCode',
          quantity: 2,
        })
      );
    });
  });

  describe('addEntries', () => {
    it('should dispatch addEntry action for each product', () => {
      service.addEntries('userId', 'cartId', [
        { productCode: 'productCode', quantity: 2 },
        { productCode: 'productCode2', quantity: 3 },
      ]);
      // @ts-ignore
      expect(store.dispatch.calls.argsFor(0)[0]).toEqual(
        new CartActions.CartAddEntry({
          cartId: 'cartId',
          userId: 'userId',
          productCode: 'productCode',
          quantity: 2,
        })
      );
      // @ts-ignore
      expect(store.dispatch.calls.argsFor(1)[0]).toEqual(
        new CartActions.CartAddEntry({
          cartId: 'cartId',
          userId: 'userId',
          productCode: 'productCode2',
          quantity: 3,
        })
      );
    });
  });

  describe('removeEntry', () => {
    it('should dispatch RemoveEntry action', () => {
      service.removeEntry('userId', 'cartId', 0);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartRemoveEntry({
          cartId: 'cartId',
          userId: 'userId',
          entryNumber: '0',
        })
      );
    });
  });

  describe('updateEntry', () => {
    it('should dispatch UpdateEntry action for quantity > 0', () => {
      service.updateEntry('userId', 'cartId', 0, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartUpdateEntry({
          userId: 'userId',
          cartId: 'cartId',
          entryNumber: '0',
          quantity: 2,
        })
      );
    });

    it('should dispatch RemoveEntry action for quantity = 0', () => {
      spyOn(service, 'removeEntry').and.callThrough();

      service.updateEntry('userId', 'cartId', 0, 0);

      expect(service.removeEntry).toHaveBeenCalledWith('userId', 'cartId', 0);
    });
  });

  describe('getEntry', () => {
    it('should return cart entry', () => {
      let result;
      service
        .getEntry('xxx', testCart.entries[0].product.code)
        .subscribe((cart) => {
          result = cart;
        });

      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toEqual(testCart.entries[0]);
    });
  });

  describe('getLastEntry', () => {
    it('should return last cart entry', () => {
      let result;
      service.getLastEntry('xxx', '1234').subscribe((cart) => {
        result = cart;
      });

      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.LoadCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
          cartId: testCart.code,
        })
      );

      expect(result).toEqual(testCart.entries[1]);
    });
  });

  describe('assignEmail', () => {
    it('should dispatch AddEmailToCart action', () => {
      service.assignEmail('cartId', 'userId', 'test@email.com');

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.AddEmailToCart({
          userId: 'userId',
          cartId: 'cartId',
          email: 'test@email.com',
        })
      );
    });
  });

  describe('deleteCart', () => {
    it('should dispatch DeleteCart action', () => {
      service.deleteCart('cartId', 'userId');

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.DeleteCart({
          userId: 'userId',
          cartId: 'cartId',
        })
      );
    });
  });

  describe('reloadCart', () => {
    it('should dispatch load cart action', () => {
      service.reloadCart('cartId', {
        active: true,
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadCart({
          cartId: 'cartId',
          userId,
          extraData: {
            active: true,
          },
        })
      );
    });
  });
});
