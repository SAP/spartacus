import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator } from '../config/utils/config-validator';
import { Config, provideConfig } from '../config/config.module';
import { CartOccModule } from './adapters/cart/cart-occ.module';
import { CheckoutOccModule } from './adapters/checkout/checkout-occ.module';
import { CmsOccModule } from './adapters/cms/cms-occ.module';
import { ProductOccModule } from './adapters/product/product-occ.module';
import { SiteContextOccModule } from './adapters/site-context/site-context-occ.module';
import { StoreFinderOccModule } from './adapters/store-finder/store-finder-occ.module';
import { UserOccModule } from './adapters/user/user-occ.module';
import { defaultOccConfig } from './config/default-occ-config';
import { OccConfig } from './config/occ-config';
import { occConfigValidator } from './config/occ-config-validator';

@NgModule({
  imports: [
    CmsOccModule,
    CartOccModule,
    CheckoutOccModule,
    ProductOccModule,
    SiteContextOccModule,
    StoreFinderOccModule,
    UserOccModule,
  ],
})
export class OccModule {
  static forRoot(): ModuleWithProviders<OccModule> {
    return {
      ngModule: OccModule,
      providers: [
        { provide: OccConfig, useExisting: Config },
        provideConfig(defaultOccConfig),
        provideConfigValidator(occConfigValidator),
      ],
    };
  }
}
