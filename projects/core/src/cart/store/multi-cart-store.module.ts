import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { MULTI_CART_FEATURE } from './cart-state';
import { multiCartReducerProvider, multiCartReducerToken } from './reducers/index';
// import { EffectsModule } from '@ngrx/effects';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {}),
    // EffectsModule.forFeature(effects),
  ],
  providers: [multiCartReducerProvider],
})
export class MultiCartStoreModule {}
