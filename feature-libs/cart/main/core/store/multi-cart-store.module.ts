import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { effects } from './effects/index';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import { multiCartMetaReducers, multiCartReducers } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducers, {
      metaReducers: multiCartMetaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
})
export class MultiCartStoreModule {}
