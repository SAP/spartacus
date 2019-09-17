import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService, UserToken } from '../../auth/index';
import { CartActions } from '../../cart/store/actions/index';
import * as fromReducers from '../../cart/store/reducers/index';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { StateWithCart } from '../store/cart-state';
import { CartDataService } from './cart-data.service';
import { CartService } from './cart.service';

class CartDataServiceStub {
  userId;
  cart;
  cartId;
}

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

describe('CartService', () => {
  let service: CartService;
  let cartData: CartDataServiceStub;
  let store: Store<StateWithCart>;

  const productCode = '1234';
  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };
  const mockCartEntry: OrderEntry = {
    entryNumber: 0,
    product: { code: productCode },
  };
  const voucherId = 'voucherTest1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CartService,
        { provide: CartDataService, useClass: CartDataServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });

    service = TestBed.get(CartService as Type<CartService>);
    cartData = TestBed.get(CartDataService as Type<CartDataService>);
    store = TestBed.get(Store as Type<Store<StateWithCart>>);
  });

  it('should CartService is injected', () => {
    expect(service).toBeTruthy();
  });

  const loadOrMergeMethod = 'loadOrMerge';
  describe(loadOrMergeMethod, () => {
    describe('when user is not an anonymous', () => {
      describe('and the cart is not created', () => {
        it('should load the cart', () => {
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = {};

          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new CartActions.LoadCart({
              userId: cartData.userId,
              cartId: 'current',
            })
          );
        });
      });
      describe('and the cart is created', () => {
        it('should merge the cart', () => {
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = cart;

          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new CartActions.MergeCart({
              userId: cartData.userId,
              cartId: cartData.cart.guid,
            })
          );
        });
      });
    });
  });

  describe('add CartEntry', () => {
    it('should be able to addCartEntry if cart exists', () => {
      store.dispatch(new CartActions.CreateCartSuccess(cart));
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;

      service.addEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartAddEntry({
          userId: userId,
          cartId: cart.code,
          productCode: productCode,
          quantity: 2,
        })
      );
    });

    it('should be able to addCartEntry if cart does not exist', () => {
      store.dispatch(new CartActions.LoadCartSuccess({}));
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = {};
      service.addEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CreateCart({
          userId: userId,
        })
      );
    });
  });

  describe('update CartEntry', () => {
    it('should be able to updateCartEntry with quantity <> 0', () => {
      spyOn(store, 'dispatch').and.stub();

      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;
      service.updateEntry('1', 1);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartUpdateEntry({
          userId: userId,
          cartId: cart.code,
          entry: '1',
          qty: 1,
        })
      );
    });

    it('should be able to updateCartEntry with quantity = 0', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;
      service.updateEntry('1', 0);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartRemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: '1',
        })
      );
    });
  });

  describe('remove CartEntry', () => {
    it('should be able to removeCartEntry', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;

      service.removeEntry(mockCartEntry);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartRemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: mockCartEntry.entryNumber,
        })
      );
    });
  });

  describe('getLoaded', () => {
    it('should return a loaded state', () => {
      store.dispatch(new CartActions.CreateCartSuccess(cart));
      let result: boolean;
      service
        .getLoaded()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(true);
    });
  });

  describe('getEntry', () => {
    it('should return an entry', () => {
      const testCart: Cart = <Cart>{
        entries: [
          { product: { code: 'code1' } },
          { product: { code: 'code2' } },
        ],
      };
      store.dispatch(new CartActions.LoadCartSuccess(testCart));

      let result: OrderEntry;
      service
        .getEntry('code1')
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(testCart.entries[0]);
    });
  });

  describe('getCartMergeComplete', () => {
    it('should return true when the merge is complete', () => {
      store.dispatch(
        new CartActions.MergeCartSuccess({ cartId: 'cartId', userId: 'userId' })
      );
      let result: boolean;
      service
        .getCartMergeComplete()
        .subscribe(mergeComplete => (result = mergeComplete))
        .unsubscribe();
      expect(result).toEqual(true);
    });
  });

  describe('getActive', () => {
    // test new behavior
  });

  describe('add Voucher', () => {
    it('should dispatch addVoucher action', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;
      service.addVoucher(voucherId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartAddVoucher({
          userId: userId,
          cartId: cart.code,
          voucherId: voucherId,
        })
      );
    });

    it('should return the error flag', () => {
      store.dispatch(new CartActions.CartAddVoucherFail('error'));
      service
        .getAddVoucherResultError()
        .subscribe(result => expect(result).toEqual(true))
        .unsubscribe();
    });

    it('should return the success flag', () => {
      store.dispatch(
        new CartActions.CartAddVoucherSuccess({
          userId: 'userId',
          cartId: 'cartId',
        })
      );
      service
        .getAddVoucherResultSuccess()
        .subscribe(result => expect(result).toEqual(true))
        .unsubscribe();
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new CartActions.CartAddVoucher({
          userId: 'userId',
          cartId: 'cartId',
          voucherId: voucherId,
        })
      );
      let result = false;
      service
        .getAddVoucherResultLoading()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should dispatch a reset action', () => {
      spyOn(store, 'dispatch').and.stub();
      service.resetAddVoucherProcessingState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartResetAddVoucher()
      );
    });
  });

  describe('remove Voucher', () => {
    it('should be able to removeVoucher', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;

      service.removeVoucher(voucherId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartRemoveVoucher({
          userId: userId,
          cartId: cart.code,
          voucherId: voucherId,
        })
      );
    });
  });
});
