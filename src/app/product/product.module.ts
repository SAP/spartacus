import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { metaReducers } from './store/reducers';

import { MediaModule } from 'app/ui/components/media/media.module';
import { NewCmsModule } from 'app/newcms/newcms.module';

import { MaterialModule } from 'app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// components
import * as fromComponents from './components';

// guards
import * as fromGuards from './guards';

// converter
import * as fromConverter from './converters';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    NewCmsModule,
    StoreModule.forFeature('products', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
  providers: [...fromConverter.services, ...fromGuards.guards]
})
export class ProductModule {}
