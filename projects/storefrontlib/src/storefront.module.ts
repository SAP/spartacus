import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  OccModule,
  PersonalizationModule,
  provideConfig,
  SmartEditModule,
} from '@spartacus/core';
import { CartPageModule } from './cms-pages/cart-page/cart-page.module';
import { CmsLibModule } from './cms-components/index';
import { ProductDetailsPageModule } from './cms-pages/product-details-page/product-details-page.module';
import { ProductListingPageModule } from './cms-pages/product-listing-page/product-listing-page.module';
import { provideConfigFromMetaTags } from './config/provide-config-from-meta-tags';
import { StorefrontFoundationModule } from './recipes/storefront-foundation.module';
import { StorefrontConfig } from './storefront-config';

@NgModule({
  imports: [
    StorefrontFoundationModule,

    SmartEditModule.forRoot(), // should be custom
    PersonalizationModule.forRoot(), // should be custom

    // opt-in explicitely
    OccModule,
    ProductDetailsPageModule,
    ProductListingPageModule,
  ],
  // move this to foundation
  providers: [...provideConfigFromMetaTags()],
})
export class StorefrontModule {
  static withConfig(config?: StorefrontConfig): ModuleWithProviders {
    return {
      ngModule: StorefrontModule,
      providers: [provideConfig(config), ...provideConfigFromMetaTags()],
    };
  }
}
