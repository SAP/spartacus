import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ModuleConfigService } from './module.config.service';
import { ConfigService } from './config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('cms', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards,
    { provide: ConfigService, useClass: ModuleConfigService },
    ModuleConfigService
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class CmsModule {
  static forRoot(config: any): any {
    const configServiceFactory = (
      appConfigService: ConfigService,
      moduleConfigService: ConfigService
    ) => {
      console.log(
        'configServiceFactory provided appConfigService',
        appConfigService
      );
      console.log(
        'configServiceFactory provided moduleConfigService',
        moduleConfigService
      );
      return { ...moduleConfigService, ...appConfigService };
    };
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: configServiceFactory,
      deps: [config, ModuleConfigService]
    };

    return {
      ngModule: CmsModule,
      providers: [configServiceProvider]
    };
  }
}
