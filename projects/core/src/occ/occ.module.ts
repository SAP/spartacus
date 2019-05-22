import { NgModule } from '@angular/core';

import { OccConfig } from './config/occ-config';
import { Config, ConfigModule } from '../config/config.module';
import { defaultOccConfig } from './config/default-occ-config';
import { provideConfigValidator } from '../config';
import { occConfigValidator } from './config/occ-config-validator';
import { CmsOccModule } from './adapters/cms/cms-occ.module';
import { CartOccModule } from './adapters/cart/cart-occ.module';
import { ProductOccModule } from './adapters/product/product-occ.module';
import { SiteContextOccModule } from './adapters/site-context/site-context-occ.module';
import { StoreFinderOccModule } from './adapters/store-finder/store-finder-occ.module';
import { UserOccModule } from './adapters/user/user-occ.module';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultOccConfig),
    CmsOccModule,
    CartOccModule,
    ProductOccModule,
    SiteContextOccModule,
    StoreFinderOccModule,
    UserOccModule,
  ],
  providers: [
    { provide: OccConfig, useExisting: Config },
    provideConfigValidator(occConfigValidator),
  ],
})
export class OccModule {}
