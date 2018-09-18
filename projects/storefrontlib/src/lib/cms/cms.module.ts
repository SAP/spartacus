import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { metaReducers } from './store/reducers/index';

// components
import { components } from './components/index';

// guards
import { guards } from './guards/index';

// services
import { services } from './services/index';
import { CmsModuleConfig, defaultCmsModuleConfig } from './cms-module-config';
import { Config, ConfigModule } from '../config/config.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('cms', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(defaultCmsModuleConfig)
  ],
  providers: [
    reducerProvider,
    ...services,
    ...guards,
    { provide: CmsModuleConfig, useExisting: Config }
  ],
  declarations: [...components],
  exports: [...components]
})
export class CmsModule {}
