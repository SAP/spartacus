import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  AuthModule,
  ConfigModule,
  provideConfig,
  RoutingModule,
  StateModule,
  SmartEditModule
} from '@spartacus/core';

import { StorefrontModuleConfig } from './storefront-config';

import { CmsLibModule } from './cms-lib/index';
import { CmsModule } from './cms/index';
import { CxApiModule } from './cx-api/cx-api.module';
import { OccModule } from './occ/index';
import { SiteContextModule } from './site-context/index';
import { UiModule, UiFrameworkModule } from './ui/index';

@NgModule({
  imports: [
    StateModule,
    RoutingModule,
    AuthModule,
    OccModule,
    SiteContextModule,
    CmsLibModule,
    CmsModule,
    UiModule,
    UiFrameworkModule,
    ConfigModule.forRoot(),
    CxApiModule,
    SmartEditModule
  ],
  exports: [UiModule],
  declarations: []
})
export class StorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: StorefrontModule,
      providers: [provideConfig(config)]
    };
  }
}
