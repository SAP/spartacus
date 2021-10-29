import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  multiCartMetaReducers,
  multiCartReducers,
  MultiCartState,
  MULTI_CART_FEATURE,
} from '@spartacus/cart/main/core';
import { effects } from './effects/index';
import { wishListReducer } from './reducers/wish-list.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      MULTI_CART_FEATURE,
      {
        ...multiCartReducers,
        wishList: wishListReducer,
      } as ActionReducerMap<MultiCartState, any>,
      { metaReducers: multiCartMetaReducers }
    ),
    EffectsModule.forFeature(effects),
  ],
})
export class WishListStoreModule {}
