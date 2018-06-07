import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AddToCartModule } from './components/add-to-cart/add-to-cart.module';
import * as fromServices from './services';
import { effects, reducers } from './store';
import { metaReducers } from './store/reducers';
import { CartDetailsModule } from './components/cart-details/cart-details.module';
import { CartSharedModule } from './components/cart-shared/cart-shared.module';

@NgModule({
  imports: [
    AddToCartModule,
    CartDetailsModule,
    CartSharedModule,
    StoreModule.forFeature('cart', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [AddToCartModule, CartDetailsModule, CartSharedModule],
  providers: [...fromServices.services]
})
export class CartModule {}
