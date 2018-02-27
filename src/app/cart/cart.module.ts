import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OccCartService } from '../newocc/cart/cart.service';

import { effects, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cart', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [OccCartService]
})
export class CartModule {}
