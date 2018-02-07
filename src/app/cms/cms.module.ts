import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { metaReducers } from './store/reducers';

// components
import * as fromComponents from './components';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';
import { ConfigService } from './config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('cms', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards, ConfigService],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class CmsModule {
  static forRoot(config: any): any {
    return {
      ngModule: CmsModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
