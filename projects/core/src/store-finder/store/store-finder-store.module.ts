import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { STORE_FINDER_FEATURE } from './store-finder-state';

import { StoreFinderOccModule } from '../occ/store-finder-occ.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreFinderOccModule,
    StoreModule.forFeature(STORE_FINDER_FEATURE, reducerToken),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class StoreFinderStoreModule {}
