import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  provideConfig,
  RoutingModule
} from '@spartacus/core';
import { StateModule } from '@spartacus/core';
import { OccModule } from './occ/index';
import { SiteContextModule } from './site-context/index';
import { CmsLibModule } from './cms-lib/index';
import { CmsModule } from './cms/index';
import { UiModule, UiFrameworkModule } from './ui/index';
import { StorefrontModuleConfig } from './storefront-config';
import { CxApiModule } from './cx-api/cx-api.module';

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
    CxApiModule
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
