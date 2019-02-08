import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  AuthModule,
  ConfigModule,
  provideConfig,
  RoutingModule,
  StateModule,
  SmartEditModule,
  CxApiModule
} from '@spartacus/core';

import { StorefrontModuleConfig } from './storefront-config';

import { CmsLibModule } from './cms-lib/index';
import { CmsModule } from './cms/index';
import { OccModule } from './occ/index';
import { UiModule, UiFrameworkModule } from './ui/index';

@NgModule({
  imports: [
    StateModule,
    RoutingModule,
    AuthModule.forRoot(),
    OccModule,
    CmsLibModule,
    CmsModule,
    UiModule,
    UiFrameworkModule,
    ConfigModule.forRoot(),
    CxApiModule,
    SmartEditModule.forRoot()
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
