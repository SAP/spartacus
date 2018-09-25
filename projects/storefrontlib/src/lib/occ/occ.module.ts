import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccUserService } from './user/user.service';
import { OccProductService } from './product/product.service';
import { OccProductSearchService } from './product/product-search.service';
import { OccSiteService } from './site-context/occ-site.service';
import { OccCartService } from './cart/cart.service';
import { OccMiscsService } from './miscs/miscs.service';
import { OccOrderService } from './order/order.service';
import { OccStoreFinderService } from './store/store-finder.service';
import { OccE2eConfigurationService } from './e2e/e2e-configuration-service';
import { Config } from '../config/config.module';
import { OccModuleConfig } from './occ-module-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccProductSearchService,
    OccProductService,
    OccSiteService,
    OccUserService,
    OccCartService,
    OccMiscsService,
    OccOrderService,
    OccStoreFinderService,
    OccE2eConfigurationService,
    { provide: OccModuleConfig, useExisting: Config }
  ]
})
export class OccModule {}
