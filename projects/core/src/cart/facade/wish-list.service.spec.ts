import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import * as fromReducers from '../../cart/store/reducers/index';
import { OrderEntry, User } from '../../model';
import { Cart } from '../../model/cart.model';
import { UserService } from '../../user/index';
import { CartActions } from '../store/actions/index';
import {
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '../store/multi-cart-state';
import { getCartIdByUserId, getWishlistName } from '../utils/utils';
import { MultiCartService } from './multi-cart.service';
import { WishListService } from './wish-list.service';
import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartCode = 'xxx';
const productCode = '123';
const customerId = '1234-5678-abcdef';

const user: User = {
  uid: userId,
  customerId,
};

const testCart: Cart = {
  code: cartCode,
  guid: 'testGuid',
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

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: productCode },
  quantity: 1,
};

class MockUserIdService implements Partial<UserIdService> {
  getUserId = createSpy().and.returnValue(of(userId));
}

class MockUserService implements Partial<UserService> {
  get = createSpy().and.returnValue(of(user));
}

class MockMultiCartService implements Partial<MultiCartService> {
  getCart = createSpy().and.returnValue(of(testCart));
  addEntry = createSpy();
  removeEntry = createSpy();
  isStable = createSpy().and.returnValue(of(true));
}

describe('WishListService', () => {
  let service: WishListService;
  let store: Store<StateWithMultiCart>;
  let multiCartService: MultiCartService;

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
        WishListService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartService, useClass: MockMultiCartService },
        { provide: UserService, useClass: MockUserService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(WishListService);
    multiCartService = TestBed.inject(MultiCartService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('createWishList', () => {
    it('should dispatch create wish list action', () => {
      const payload = {
        userId: 'userId',
        name: 'name',
        description: 'description',
      };
      service.createWishList(payload.userId, payload.name, payload.description);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CreateWishList(payload)
      );
    });
  });

  describe('getWishListId', () => {
    it('should return wish list id', (done) => {
      let result;
      service['getWishListId']().subscribe((id) => {
        result = id;
      });

      expect(result).toEqual('');

      store.dispatch(
        new CartActions.LoadWishListSuccess({
          cart: testCart,
          userId,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );

      expect(result).toEqual(cartCode);
      done();
    });
  });

  describe('getWishList', () => {
    it('should create wish list if not loaded', () => {
      const payload = {
        userId,
        customerId,
        tempCartId: getWishlistName(customerId),
      };
      service.getWishList().subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWishList(payload)
      );
    });
    it('should return wish list if loaded', (done) => {
      spyOn(service, 'loadWishList');
      let result;

      store.dispatch(
        new CartActions.LoadWishListSuccess({
          cart: testCart,
          userId,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );
      service.getWishList().subscribe((cart) => (result = cart));

      expect(service.loadWishList).not.toHaveBeenCalled();

      expect(result).toEqual(testCart);
      done();
    });
  });

  describe('loadWishList', () => {
    it('should dispatch load wish list action', () => {
      const payload = {
        userId,
        customerId,
        tempCartId: getWishlistName(customerId),
      };

      service.loadWishList(userId, customerId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWishList(payload)
      );
    });
  });

  describe('addEntry', () => {
    it('should dispatch CartAddEntry if wish list exists', () => {
      store.dispatch(
        new CartActions.LoadWishListSuccess({
          cart: testCart,
          userId,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );
      service.addEntry(productCode);

      expect(multiCartService.addEntry).toHaveBeenCalledWith(
        userId,
        cartCode,
        productCode,
        1
      );
    });

    it('should call load wish list if not loaded', () => {
      const payload = {
        userId,
        customerId,
        tempCartId: getWishlistName(customerId),
      };
      service.addEntry(productCode);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWishList(payload)
      );
    });
  });

  describe('removeEntry', () => {
    it('should dispatch CartRemoveEntry if wish list exists', () => {
      store.dispatch(
        new CartActions.LoadWishListSuccess({
          cart: testCart,
          userId,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );
      service.removeEntry(mockCartEntry);
      expect(multiCartService.removeEntry).toHaveBeenCalledWith(
        userId,
        cartCode,
        mockCartEntry.entryNumber
      );
    });

    it('should call load wish list if not loaded', () => {
      const payload = {
        userId,
        customerId,
        tempCartId: getWishlistName(customerId),
      };
      service.removeEntry(mockCartEntry);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWishList(payload)
      );
    });
  });

  describe('getWishListLoading', () => {
    it('should return if the wish list loading', (done) => {
      let result;
      service.getWishListLoading().subscribe((loading) => {
        result = loading;
      });

      expect(result).toEqual(false);
      done();
    });
  });
});
