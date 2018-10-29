import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { SITE_CONTEXT_FEATURE } from './state';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(SITE_CONTEXT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class SiteContextStoreModule {}
