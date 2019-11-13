import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../cart/store/reducers/index';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { WishListService } from './wish-list.service';

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
});
