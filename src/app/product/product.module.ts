import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { metaReducers } from './store/reducers';

// components
// import * as fromComponents from './components';

// services
// import * as fromServices from './services';
import * as fromConverter from './converters';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('products', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromConverter.services]
  // declarations: [...fromComponents.components],
  // exports: [...fromComponents.components]
})
export class ProductModule {}
