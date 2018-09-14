import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
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
import { CmsModuleConfig } from './cms-module-config';
import { ConfigModule, Configuration } from '../config/config.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('cms', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(new CmsModuleConfig())
  ],
  providers: [
    reducerProvider,
    ...services,
    ...guards,
    {
      provide: CmsModuleConfig,
      useExisting: Configuration
    }
  ],
  declarations: [...components],
  exports: [...components]
})
export class CmsModule {}
