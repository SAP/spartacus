import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { CMS_FEATURE } from './cms-state';

import { metaReducers } from './reducers/index';
import { CmsOccModule } from '../occ/cms-occ.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CmsOccModule,
    StoreModule.forFeature(CMS_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class ProductStoreModule {}
