import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Cart, CartType } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartActions } from '../store/actions';
import {
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '../store/multi-cart-state';
import * as fromReducers from '../store/reducers/index';
import { MultiCartService } from './multi-cart.service';

import createSpy = jasmine.createSpy;

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
    it('should return true when cart is stable when there is no active cart', (done) => {
      service
        .isStable('xxx')
        .pipe(take(1))
        .subscribe((isStable) => {
          expect(isStable).toBe(true);
          done();
        });
    });

    it('should return true when cart is stable when there are 0 processes and loading is false', (done) => {
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
          extraData: {
            active: true,
          },
        })
      );

      service
        .isStable('xxx')
        .pipe(take(1))
        .subscribe((isStable) => {
          expect(isStable).toBe(false);
          done();
        });
    });
  });

  describe('createCart', () => {
    const payload = {
      userId: 'userId',
      extraData: undefined,
      oldCartId: undefined,
      toMergeCartGuid: undefined,
      tempCartId: 'temp-uuid',
    };

    it('should create a non-active cart and return observable with cart', () => {
      spyOn(service as any, 'generateTempCartId').and.returnValue('temp-uuid');

      let result;
      service
        .createCart({ userId: 'userId' })
        .subscribe((cart) => (result = cart));
      expect(result).toEqual(undefined);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CreateCart(payload)
      );

      store.dispatch(
        new CartActions.CreateCartSuccess({
          ...payload,
          cart: testCart,
          cartId: testCart.code as string,
        })
      );
      store.dispatch(
        new CartActions.SetCartTypeIndex({
          cartType: CartType.NEW_CREATED,
          cartId: testCart.code,
        })
      );
      expect(result).toEqual(testCart);
    });

    it('should create an active cart and return observable with cart', () => {
      spyOn(service as any, 'generateTempCartId').and.returnValue('temp-uuid');

      let result;
      service
        .createCart({ userId: 'userId', extraData: { active: true } })
        .subscribe((cart) => (result = cart));
      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.CreateCartSuccess({
          ...payload,
          cart: testCart,
          cartId: testCart.code as string,
          extraData: { active: true },
        })
      );
      store.dispatch(
        new CartActions.SetCartTypeIndex({
          cartType: CartType.ACTIVE,
          cartId: testCart.code,
        })
      );
      expect(result).toEqual(testCart);
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
          pickupStore: undefined,
        })
      );
    });

    it('should dispatch addEntry action with pickupStore', () => {
      service.addEntry('userId', 'cartId', 'productCode', 2, 'pickupStore');

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartAddEntry({
          cartId: 'cartId',
          userId: 'userId',
          productCode: 'productCode',
          quantity: 2,
          pickupStore: 'pickupStore',
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
          pickupStore: undefined,
          pickupToDelivery: false,
        })
      );
    });

    it('should dispatch UpdateEntry action for updating pickupStore', () => {
      service.updateEntry('userId', 'cartId', 0, undefined, 'pickupStore');

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartUpdateEntry({
          userId: 'userId',
          cartId: 'cartId',
          entryNumber: '0',
          quantity: undefined,
          pickupStore: 'pickupStore',
          pickupToDelivery: false,
        })
      );
    });

    it('should dispatch UpdateEntry action for switch from pickup to delivery', () => {
      service.updateEntry('userId', 'cartId', 0, 4, undefined, true);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartUpdateEntry({
          userId: 'userId',
          cartId: 'cartId',
          entryNumber: '0',
          quantity: 4,
          pickupStore: undefined,
          pickupToDelivery: true,
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

  describe('removeCart', () => {
    it('should dispatch RemoveCart action', () => {
      service.removeCart('cartId');

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.RemoveCart({
          cartId: 'cartId',
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

  describe('getCartIdByType', () => {
    it('should return cartId by cart type', () => {
      let result;
      service.getCartIdByType(CartType.ACTIVE).subscribe((cartId) => {
        result = cartId;
      });

      expect(result).toEqual('');

      store.dispatch(
        new CartActions.SetCartTypeIndex({
          cartType: CartType.ACTIVE,
          cartId: 'testCartId',
        })
      );

      expect(result).toEqual('testCartId');
    });
  });
});
