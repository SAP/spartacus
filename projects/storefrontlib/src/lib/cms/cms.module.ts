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
import { DefaultConfigService } from '../../default-config.service';
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
    { provide: ConfigService, useClass: DefaultConfigService },
    DefaultConfigService
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class CmsModule {
  static forRoot(config: any): any {
    const configServiceFactory = (
      appConfigService: ConfigService,
      defaultConfigService: ConfigService
    ) => {
      console.log(
        'configServiceFactory provided appConfigService',
        appConfigService
      );
      console.log(
        'configServiceFactory provided defaultConfigService',
        defaultConfigService
      );
      return { ...defaultConfigService, ...appConfigService };
    };
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: configServiceFactory,
      deps: [config, DefaultConfigService]
    };

    return {
      ngModule: CmsModule,
      providers: [configServiceProvider]
    };
  }
}
