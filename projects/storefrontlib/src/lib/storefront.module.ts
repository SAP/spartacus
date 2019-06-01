import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  CxApiModule,
  I18nModule,
  OccModule,
  PersonalizationModule,
  provideConfig,
  SmartEditModule,
  StateModule,
} from '@spartacus/core';
import { CmsLibModule } from '../cms-components/index';
import { CartPageModule } from '../cms-pages/cart-page/cart-page.module';
import { OrderConfirmationPageModule } from '../cms-pages/order-confirmation-page/order-confirmation-page.module';
import { ProductDetailsPageModule } from '../cms-pages/product-details-page/product-details-page.module';
import { ProductListingPageModule } from '../cms-pages/product-listing-page/product-listing-page.module';
import { CmsModule } from '../cms-structure/cms.module';
import { PageLayoutModule } from '../cms-structure/page/page-layout/page-layout.module';
import { CmsRouteModule } from '../cms-structure/routing/cms-route/cms-route.module';
import { RoutingModule } from '../cms-structure/routing/routing.module';
import { SuffixRoutesModule } from '../cms-structure/routing/suffix-routes/suffix-routes.module';
import { provideConfigFromMetaTags } from './provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './storefront-config';

@NgModule({
  imports: [
    OccModule,
    StateModule,
    AuthModule.forRoot(),
    CmsLibModule,
    CmsModule,
    SuffixRoutesModule,
    CmsRouteModule,
    ConfigModule.forRoot(),
    RoutingModule,
    CxApiModule,
    SmartEditModule.forRoot(),
    PersonalizationModule.forRoot(),
    I18nModule.forRoot(),
    PageLayoutModule,
    // pages
    ProductDetailsPageModule,
    ProductListingPageModule,
    CartPageModule, // as longs as we do not have #2661 in place we need a specific cart page module
    OrderConfirmationPageModule, // temp add here till it gets removed by #2691
  ],
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
