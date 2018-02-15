import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { metaReducers } from './store/reducers';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';
import { ProductListModule } from './components/product-list/product-list.module';
import { ProductDetailsModule } from './components/product-details/product-details.module';

import { MaterialModule } from './../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// guards
import * as fromGuards from './guards';

// converter
import * as fromConverter from './converters';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,
    ProductListModule,
    ProductDetailsModule,
    StoreModule.forFeature('products', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [ProductListModule, ProductDetailsModule],
  providers: [...fromConverter.services, ...fromGuards.guards]
})
export class ProductModule {}
