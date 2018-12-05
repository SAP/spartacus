import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { metaReducers, reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects';
import { ProductConverterModule } from '../../product';
import { USER_FEATURE } from './user-state';

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
