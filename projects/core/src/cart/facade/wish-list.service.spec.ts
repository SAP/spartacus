import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../cart/store/reducers/index';
import { Cart } from '../../model/cart.model';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { WishListService } from './wish-list.service';

const userId = 'testUserId';
const cartCode = 'xxx';

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

describe('WishListService', () => {
  let service: WishListService;
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
      providers: [WishListService],
    });

    store = TestBed.get(Store as Type<Store<StateWithMultiCart>>);
    service = TestBed.get(WishListService as Type<WishListService>);

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
      service.getWishListId().subscribe(id => {
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
      service.getWishList(userId).subscribe();

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

      service.getWishList(userId).subscribe(cart => (result = cart));

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
});
