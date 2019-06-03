import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  CxApiModule,
  OccModule,
  PersonalizationModule,
  provideConfig,
  SmartEditModule,
} from '@spartacus/core';
import { CmsLibModule } from './cms-components/index';
import { CartPageModule } from './cms-pages/cart-page/cart-page.module';
import { OrderConfirmationPageModule } from './cms-pages/order-confirmation-page/order-confirmation-page.module';
import { ProductDetailsPageModule } from './cms-pages/product-details-page/product-details-page.module';
import { ProductListingPageModule } from './cms-pages/product-listing-page/product-listing-page.module';
import { CmsModule } from './cms-structure/cms.module';
import { provideConfigFromMetaTags } from './config/provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './config/storefront-config';
import { StorefrontFoundationModule } from './storefront-foundation.module';

@NgModule({
  imports: [
    OccModule,
    StorefrontFoundationModule,

    CmsLibModule, // optionated

    CmsModule, // will be dropped
    CxApiModule, // will be dropped

    SmartEditModule.forRoot(), // should be custom
    PersonalizationModule.forRoot(), // should be custom

    // pages to opt-in / out from
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
