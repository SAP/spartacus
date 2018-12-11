import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { metaReducers, reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { ProductConverterModule } from '../../product/store/index';
import { USER_FEATURE } from './index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(USER_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    RouterModule,
    ProductConverterModule
  ],
  providers: [reducerProvider]
})
export class UserStoreModule {}
