import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  CxApiModule,
  I18nModule,
  OccModule,
  PersonalizationModule,
  provideConfig,
  RoutingModule,
  SmartEditModule,
  StateModule,
} from '@spartacus/core';
import { CmsLibModule } from '../cms-components/index';
import { ProductDetailsPageModule } from '../cms-pages/product-details-page/product-details-page.module';
import { CmsModule } from '../cms-structure/cms.module';
import { CmsRouteModule } from '../cms-structure/routing/cms-route/cms-route.module';
import { SuffixRoutesModule } from '../cms-structure/routing/suffix-routes/suffix-routes.module';
import { provideConfigFromMetaTags } from './provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './storefront-config';
import { UiModule } from './ui/index';

@NgModule({
  imports: [
    OccModule,
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
    I18nModule.forRoot(),
    // pages
    ProductDetailsPageModule,
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
