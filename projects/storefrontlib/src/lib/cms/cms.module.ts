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
import { ConfigService } from '../../config.service';
import { AbstractStorefrontModule } from '../../abstract-storefront-module';

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
export class CmsModule extends AbstractStorefrontModule {
  static forRoot(config: any): any {
    const configOverriddeProvider = this.getConfigOverrideProvider(config);
    return {
      ngModule: CmsModule,
      providers: [configOverriddeProvider]
    };
  }
}
