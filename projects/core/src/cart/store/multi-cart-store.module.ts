import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { MultiCartEffects } from './effects/multi-cart.effect';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import {
  multiCartMetaReducers,
  multiCartReducerProvider,
  multiCartReducerToken,
} from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
      metaReducers: multiCartMetaReducers,
    }),
    EffectsModule.forFeature([MultiCartEffects]),
  ],
  providers: [multiCartReducerProvider],
})
export class MultiCartStoreModule {}
