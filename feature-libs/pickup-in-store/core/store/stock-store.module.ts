import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { STOCK_FEATURE } from './stock-state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STOCK_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class StockStoreModule {}
