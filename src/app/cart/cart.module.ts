import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AddToCartModule } from './components/add-to-cart/add-to-cart.module';
import * as fromServices from './services';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    AddToCartModule,
    StoreModule.forFeature('cart', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [AddToCartModule],
  providers: [...fromServices.services]
})
export class CartModule {}
