import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { metaReducers, reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { PRODUCT_INTERESTS_FEATURE } from './product-interests-state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(PRODUCT_INTERESTS_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class ProductInterestsStoreModule {}
