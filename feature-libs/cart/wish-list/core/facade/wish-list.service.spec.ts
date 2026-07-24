import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  getCartIdByUserId,
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '@spartacus/cart/base/core';
import { Cart, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { OCC_USER_ID_ANONYMOUS, User, UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of, firstValueFrom } from 'rxjs';
import { getMultiCartReducers } from '../../../base/core/store/reducers';
import { WishListActions } from '../store/actions/index';
import { getWishlistName } from '../utils/utils';
import { WishListService } from './wish-list.service';


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
  getUserId(): Observable<string> {
    return of(userId);
  }
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get() {
    return of(user);
  }
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart = vi.fn().mockReturnValue(of(testCart));
  addEntry = vi.fn();
  removeEntry = vi.fn();
  isStable = vi.fn().mockReturnValue(of(true));
  getCartIdByType(): Observable<string> {
    return of(cartCode);
  }
}

describe('WishListService', () => {
  let service: WishListService;
  let store: Store<StateWithMultiCart>;
  let multiCartFacade: MultiCartFacade;
  let userIdService: UserIdService;
  let userAccountFacade: UserAccountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(MULTI_CART_FEATURE, getMultiCartReducers()),
      ],
      providers: [
        WishListService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(WishListService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    userIdService = TestBed.inject(UserIdService);
    userAccountFacade = TestBed.inject(UserAccountFacade);

    vi.spyOn(store, 'dispatch');
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
        new WishListActions.CreateWishList(payload)
      );
    });
  });

  describe('getWishListId', () => {
    it('should return wish list id', async () => {
      const id = await firstValueFrom(service['getWishListId']());
      expect(id).toEqual(cartCode);
    });
  });

  describe('getWishList', () => {
    it('should create wish list if not loaded', () => {
      vi.spyOn(multiCartFacade, 'getCartIdByType').mockReturnValue(of(undefined));
      const payload = {
        userId,
        cartId: getWishlistName(customerId),
      };
      service.getWishList().subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new WishListActions.LoadWishList(payload)
      );
    });

    it('should not load wishlist for anonymous user', () => {
      vi.spyOn(service, 'loadWishList');
      vi.spyOn(userIdService, 'getUserId').mockReturnValue(
        of(OCC_USER_ID_ANONYMOUS)
      );
      service.getWishList().subscribe();

      expect(service.loadWishList).not.toHaveBeenCalled();
    });

    it('should not load wishlist if custoemr not exist', () => {
      vi.spyOn(service, 'loadWishList');
      vi.spyOn(userAccountFacade, 'get').mockReturnValue(of({}));
      service.getWishList().subscribe();

      expect(service.loadWishList).not.toHaveBeenCalled();
    });

    it('should return wish list if loaded', async () => {
      vi.spyOn(service, 'loadWishList');

      store.dispatch(
        new WishListActions.LoadWishListSuccess({
          cart: testCart,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );
      const result = await firstValueFrom(service.getWishList());

      expect(service.loadWishList).not.toHaveBeenCalled();

      expect(result).toEqual(testCart);
    });
  });

  describe('loadWishList', () => {
    it('should dispatch load wish list action', () => {
      const payload = {
        userId,
        cartId: getWishlistName(customerId),
      };

      service.loadWishList(userId, customerId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new WishListActions.LoadWishList(payload)
      );
    });
  });

  describe('addEntry', () => {
    it('should dispatch CartAddEntry if wishlist exists', () => {
      store.dispatch(
        new WishListActions.LoadWishListSuccess({
          cart: testCart,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );
      service.addEntry(productCode);

      expect(multiCartFacade.addEntry).toHaveBeenCalledWith(
        userId,
        cartCode,
        productCode,
        1
      );
    });

    it('should call load wish list if not loaded', () => {
      vi.spyOn(multiCartFacade, 'getCartIdByType').mockReturnValue(of(undefined));
      const payload = {
        userId,
        cartId: getWishlistName(customerId),
      };
      service.addEntry(productCode);

      expect(store.dispatch).toHaveBeenCalledWith(
        new WishListActions.LoadWishList(payload)
      );
    });
  });

  describe('removeEntry', () => {
    it('should dispatch CartRemoveEntry if wish list exists', () => {
      store.dispatch(
        new WishListActions.LoadWishListSuccess({
          cart: testCart,
          cartId: getCartIdByUserId(testCart, userId),
        })
      );
      service.removeEntry(mockCartEntry);
      expect(multiCartFacade.removeEntry).toHaveBeenCalledWith(
        userId,
        cartCode,
        mockCartEntry.entryNumber
      );
    });

    it('should call load wish list if not loaded', () => {
      vi.spyOn(multiCartFacade, 'getCartIdByType').mockReturnValue(of(undefined));
      const payload = {
        userId,
        cartId: getWishlistName(customerId),
      };
      service.removeEntry(mockCartEntry);

      expect(store.dispatch).toHaveBeenCalledWith(
        new WishListActions.LoadWishList(payload)
      );
    });
  });

  describe('getWishListLoading', () => {
    it('should return if the wish list loading', async () => {
      const result = await firstValueFrom(service.getWishListLoading());
      expect(result).toEqual(false);
    });
  });
});
