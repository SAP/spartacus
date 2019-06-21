import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService, UserToken } from '../../auth';
import * as fromCart from '../../cart/store';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import { StateWithCart } from '../store/cart-state';
import { ANONYMOUS_USERID, CartDataService } from './cart-data.service';
import { CartUtilService } from './cart-util.service';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromCart.getReducers()),
      ],
      providers: [
        CartService,
        { provide: CartDataService, useClass: CartDataServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });

    service = TestBed.get(CartService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);
  });

  it('should CartService is injected', () => {
    expect(service).toBeTruthy();
  });

  const loadOrMergeMethod = 'loadOrMerge';
  describe(loadOrMergeMethod, () => {
    describe('when user is not an anonymous', () => {
      describe('and the cart is not created', () => {
        it('should load the cart', () => {
          spyOn(CartUtilService, 'isCreated').and.returnValue(false);
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = cart;

          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new fromCart.LoadCart({
              userId: cartData.userId,
              cartId: 'current',
            })
          );
        });
      });
      describe('and the cart is created', () => {
        it('should merge the cart', () => {
          spyOn(CartUtilService, 'isCreated').and.returnValue(true);
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = cart;

          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new fromCart.MergeCart({
              userId: cartData.userId,
              cartId: cartData.cart.guid,
            })
          );
        });
      });
    });
  });

  describe('Load cart details', () => {
    it('should load more details when a user is logged in', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;

      service.loadDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: userId,
          cartId: cart.code,
        })
      );
    });

    it('should load more details for anonymous user if cartid exists', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.cart = cart;
      cartData.userId = ANONYMOUS_USERID;
      cartData.cartId = cart.guid;

      service.loadDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: ANONYMOUS_USERID,
          cartId: cart.guid,
        })
      );
    });

    it('should not load more details for anonymous user if cartid and guid is null', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = ANONYMOUS_USERID;

      service.loadDetails();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('add CartEntry', () => {
    it('should be able to addCartEntry if cart exists', () => {
      spyOn(service, 'isCreated').and.returnValue(true);
      store.dispatch(new fromCart.CreateCartSuccess(cart));
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;

      service.addEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.AddEntry({
          userId: userId,
          cartId: cart.code,
          productCode: productCode,
          quantity: 2,
        })
      );
    });

    it('should be able to addCartEntry if cart does not exist', () => {
      spyOn(CartUtilService, 'isCreated').and.returnValue(false);
      store.dispatch(new fromCart.LoadCartSuccess(cart));
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = {};
      service.addEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.CreateCart({
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
        new fromCart.UpdateEntry({
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
        new fromCart.RemoveEntry({
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
        new fromCart.RemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: mockCartEntry.entryNumber,
        })
      );
    });
  });

  describe('getLoaded', () => {
    it('should return a loaded state', () => {
      store.dispatch(new fromCart.CreateCartSuccess(cart));
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
      store.dispatch(new fromCart.LoadCartSuccess(testCart));

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
        new fromCart.MergeCartSuccess({ cartId: 'cartId', userId: 'userId' })
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
});
