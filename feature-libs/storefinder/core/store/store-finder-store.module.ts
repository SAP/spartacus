import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import { effects } from './effects/index';
import { STORE_FINDER_FEATURE } from './store-finder-state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STORE_FINDER_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class StoreFinderStoreModule {}
