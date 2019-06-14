import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  OccModule,
  PersonalizationModule,
  provideConfig,
  SmartEditModule,
} from '@spartacus/core';
import { ProductDetailsPageModule } from '../cms-pages/product-details-page/product-details-page.module';
import { ProductListingPageModule } from '../cms-pages/product-listing-page/product-listing-page.module';
import { StorefrontConfig } from '../storefront-config';
import { StorefrontFoundationModule } from './storefront-foundation.module';

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
})
export class StorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<StorefrontModule> {
    return {
      ngModule: StorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
