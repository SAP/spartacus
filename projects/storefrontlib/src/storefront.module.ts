import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  CxApiModule,
  I18nModule,
  KymaModule,
  OccModule,
  PersonalizationModule,
  provideConfig,
  SmartEditModule,
  StateModule,
} from '@spartacus/core';
import { CmsLibModule } from './cms-components/index';
import { CartPageModule } from './cms-pages/cart-page/cart-page.module';
import { ProductDetailsPageModule } from './cms-pages/product-details-page/product-details-page.module';
import { ProductListingPageModule } from './cms-pages/product-listing-page/product-listing-page.module';
import { CmsModule } from './cms-structure/cms.module';
import { CmsRouteModule } from './cms-structure/routing/cms-route/cms-route.module';
import { RoutingModule } from './cms-structure/routing/routing.module';
import { provideConfigFromMetaTags } from './config/provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './config/storefront-config';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    OccModule,
    StateModule,
    AuthModule.forRoot(),
    CmsLibModule,
    CmsModule,
    CmsRouteModule,
    ConfigModule.forRoot(),
    RoutingModule,
    CxApiModule,
    SmartEditModule.forRoot(),
    PersonalizationModule.forRoot(),
    I18nModule.forRoot(),
    KymaModule,
    LayoutModule,
    // pages
    ProductDetailsPageModule,
    ProductListingPageModule,
    CartPageModule, // as longs as we do not have #2661 in place we need a specific cart page module
  ],
  exports: [LayoutModule],
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
