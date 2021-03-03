import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import { effects } from './effects/index';
import { BUNDLE_FEATURE } from './bundle-state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BUNDLE_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class BundleStoreModule {}
