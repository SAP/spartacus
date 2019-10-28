import { StoreModule, Store } from '@ngrx/store';
import * as fromReducers from '../../cart/store/reducers/index';
import { TestBed } from '@angular/core/testing';
import { MultiCartService } from './multi-cart.service';
import { Type } from '@angular/core';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { CartActions } from '../store/actions';
import { Cart } from '../../model/cart.model';

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

describe('MultiCartService', () => {
  let service: MultiCartService;
  let store: Store<StateWithMultiCart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          'multi-cart',
          fromReducers.getMultiCartReducers()
        ),
      ],
      providers: [MultiCartService],
    });

    store = TestBed.get(Store as Type<Store<StateWithMultiCart>>);
    service = TestBed.get(MultiCartService as Type<MultiCartService>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCart', () => {
    it('should return cart with given id', done => {
      let result;
      service.getCart('xxx').subscribe(cart => {
        result = cart;
      });

      expect(result).toEqual(undefined);

      store.dispatch(
        new CartActions.LoadMultiCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
        })
      );

      expect(result).toEqual(testCart);
      done();
    });
  });

  describe('getCartEntity', () => {
    it('should return cart entity with given id', done => {
      let result;
      service.getCartEntity('xxx').subscribe(cartEntity => {
        result = cartEntity;
      });

      expect(result).toEqual({
        loading: false,
        success: false,
        error: false,
        value: undefined,
      });

      store.dispatch(
        new CartActions.LoadMultiCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
        })
      );

      expect(result).toEqual({
        loading: false,
        success: true,
        error: false,
        value: testCart,
      });

      done();
    });
  });

  describe('createCart', () => {
    it('should create cart and return observable with cart', done => {
      let result;

      service.createCart({ userId: 'userId' }).subscribe(cart => {
        result = cart;
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CreateCart({
          userId: 'userId',
          extraData: undefined,
          oldCartId: undefined,
          toMergeCartGuid: undefined,
        })
      );

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: undefined,
      });

      store.dispatch(new CartActions.SetFreshCart(testCart));

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: testCart,
      });

      done();
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
    it('should return cart entries', done => {
      let result;
      service.getEntries('xxx').subscribe(cart => {
        result = cart;
      });

      expect(result).toEqual([]);

      store.dispatch(
        new CartActions.LoadMultiCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
        })
      );

      expect(result).toEqual(testCart.entries);

      done();
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
    it('should dispatch addEntries action', () => {
      service.addEntries('userId', 'cartId', [
        { productCode: 'productCode', quantity: 2 },
      ]);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartAddEntries({
          cartId: 'cartId',
          userId: 'userId',
          products: [{ productCode: 'productCode', quantity: 2 }],
        })
      );
    });
  });

  describe('initAddEntryProcess', () => {
    it('should dispatch CartStartAddEntryProcess action', () => {
      service.initAddEntryProcess();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartStartAddEntryProcess()
      );
    });
  });

  describe('removeEntry', () => {
    it('should dispatch RemoveEntry action', () => {
      service.initAddEntryProcess();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartStartAddEntryProcess()
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
          entry: 0,
          qty: 2,
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
    it('should return cart entry', done => {
      let result;
      service
        .getEntry('xxx', testCart.entries[0].product.code)
        .subscribe(cart => {
          result = cart;
        });

      expect(result).toEqual(null);

      store.dispatch(
        new CartActions.LoadMultiCartSuccess({
          userId: 'userId',
          extraData: {
            active: true,
          },
          cart: testCart,
        })
      );

      expect(result).toEqual(testCart.entries[0]);
      done();
    });
  });

  describe('assignEmail', () => {
    it('should dispatch AddEmailToCart action', () => {
      service.assignEmail('cartId', 'userId', 'test@email.com');

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.AddEmailToCart({
          userId: 'userId',
          cartId: 'cartId',
          email: 'test@email.com'
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
          cartId: 'cartId'
        })
      );
    });
  });
});
