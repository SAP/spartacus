import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { metaReducers } from './store/reducers';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';

import { MaterialModule } from './../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//removed later
import { AddToCartModule } from '../cart/components/add-to-cart/add-to-cart.module';

// components
import * as fromComponents from './components';

// guards
import * as fromGuards from './guards';

// converter
import * as fromConverter from './converters';

@NgModule({
  imports: [
    AddToCartModule,
    CommonModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,
    StoreModule.forFeature('products', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
  providers: [...fromConverter.services, ...fromGuards.guards]
})
export class ProductModule {}
