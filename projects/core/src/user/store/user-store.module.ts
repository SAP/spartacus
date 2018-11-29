import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { metaReducers } from './reducers/index';
import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { ProductConverterModule } from '../../product';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    RouterModule,
    ProductConverterModule
  ],
  providers: [reducerProvider]
})
export class UserStoreModule {}
