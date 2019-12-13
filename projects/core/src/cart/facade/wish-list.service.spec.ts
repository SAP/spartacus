import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from '../../auth';
import * as fromReducers from '../../cart/store/reducers/index';
import { OrderEntry } from '../../model';
import { Cart } from '../../model/cart.model';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartService } from './multi-cart.service';
import { WishListService } from './wish-list.service';
import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cartCode = 'xxx';
const productCode = '123';

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

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

class MockMultiCartService {
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
          'multi-cart',
          fromReducers.getMultiCartReducers()
        ),
      ],
      providers: [
        WishListService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: MultiCartService, useClass: MockMultiCartService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithMultiCart>>);
    service = TestBed.get(WishListService as Type<WishListService>);
    multiCartService = TestBed.get(MultiCartService as Type<MultiCartService>);

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
    it('should return wish list id', done => {
      let result;
      service['getWishListId']().subscribe(id => {
        result = id;
      });

      expect(result).toEqual('');

      store.dispatch(
        new CartActions.LoadWisthListSuccess({ cart: testCart, userId })
      );

      expect(result).toEqual(cartCode);
      done();
    });
  });

  describe('getWishList', () => {
    it('should create wish list if not loaded', () => {
      service.getWishList().subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWisthList(userId)
      );
    });
    it('should return wish list if loaded', done => {
      spyOn(service, 'loadWishList');
      let result;

      store.dispatch(
        new CartActions.LoadWisthListSuccess({ cart: testCart, userId })
      );
      service.getWishList().subscribe(cart => (result = cart));

      expect(service.loadWishList).not.toHaveBeenCalled();

      expect(result).toEqual(testCart);
      done();
    });
  });

  describe('loadWishList', () => {
    it('should dispatch load wish list action', () => {
      service.loadWishList(userId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWisthList(userId)
      );
    });
  });

  describe('addEntry', () => {
    it('should dispatch CartAddEntry if wish list exists', () => {
      store.dispatch(
        new CartActions.LoadWisthListSuccess({ cart: testCart, userId })
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
      service.addEntry(productCode);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWisthList(userId)
      );
    });
  });

  describe('removeEntry', () => {
    it('should dispatch CartRemoveEntry if wish list exists', () => {
      store.dispatch(
        new CartActions.LoadWisthListSuccess({ cart: testCart, userId })
      );
      service.removeEntry(mockCartEntry);
      expect(multiCartService.removeEntry).toHaveBeenCalledWith(
        userId,
        cartCode,
        mockCartEntry.entryNumber
      );
    });

    it('should call load wish list if not loaded', () => {
      service.removeEntry(mockCartEntry);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadWisthList(userId)
      );
    });
  });

  describe('getWishListLoading', () => {
    it('should return if the wish list loading', done => {
      let result;
      service.getWishListLoading().subscribe(loading => {
        result = loading;
      });

      expect(result).toEqual(false);
      done();
    });
  });
});
