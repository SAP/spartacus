import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  CxApiModule,
  I18nModule,
  PersonalizationModule,
  provideConfig,
  RoutingModule,
  SmartEditModule,
  StateModule,
} from '@spartacus/core';
import { CmsLibModule } from '../cms-components/index';
import { MultiStepCheckoutModule } from './checkout/index';
import { CmsRouteModule } from './cms-route/cms-route.module';
import { CmsModule } from './cms/index';
import { provideConfigFromMetaTags } from './provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './storefront-config';
import { SuffixRoutesModule } from './suffix-routes/suffix-routes.module';
import { UiModule } from './ui/index';

@NgModule({
  imports: [
    StateModule,
    RoutingModule,
    AuthModule.forRoot(),
    CmsLibModule,
    CmsModule,
    UiModule,
    SuffixRoutesModule,
    CmsRouteModule,
    ConfigModule.forRoot(),
    CxApiModule,
    SmartEditModule.forRoot(),
    PersonalizationModule.forRoot(),
    MultiStepCheckoutModule,
    I18nModule.forRoot(),
  ],
  exports: [UiModule],
  providers: [...provideConfigFromMetaTags()],
  declarations: [],
})
export class StorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: StorefrontModule,
      providers: [provideConfig(config), ...provideConfigFromMetaTags()],
    };
  }
}
