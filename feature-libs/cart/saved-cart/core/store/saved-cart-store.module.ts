import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { reducerProvider, reducerToken } from './reducers/index';
import { SAVED_CART_FEATURE } from './saved-cart-state';

@NgModule({
  imports: [
    StoreModule.forFeature(SAVED_CART_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class SavedCartStoreModule {}
