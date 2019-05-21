import { NgModule } from '@angular/core';

import { OccConfig } from './config/occ-config';
import { Config, ConfigModule } from '../config/config.module';
import { defaultOccConfig } from './config/default-occ-config';
import { provideConfigValidator } from '../config';
import { occConfigValidator } from './config/occ-config-validator';
import { CmsOccModule } from '../cms/occ/cms-occ.module';
import { CartOccModule } from '../cart//occ/cart-occ.module';
import { ProductOccModule } from '../product/occ/product-occ.module';
import { SiteContextOccModule } from '../site-context/occ/site-context-occ.module';
import { StoreFinderOccModule } from '../store-finder/occ/store-finder-occ.module';
import { UserOccModule } from '../user/occ/user-occ.module';

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
