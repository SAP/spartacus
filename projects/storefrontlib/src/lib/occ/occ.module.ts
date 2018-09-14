import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OccModuleConfig } from './occ-module-config';
import { HttpClientModule } from '@angular/common/http';

import { OccUserService } from './user/user.service';
import { OccProductService } from './product/product.service';
import { OccProductSearchService } from './product/product-search.service';
import { OccSiteService } from './site-context/occ-site.service';
import { OccCartService } from './cart/cart.service';
import { OccMiscsService } from './miscs/miscs.service';
import { OccOrderService } from './order/order.service';
import { ConfigModule, Configuration } from '../config/config.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, ConfigModule.withConfig(new OccModuleConfig())],
  providers: [
    OccProductSearchService,
    OccProductService,
    OccSiteService,
    OccUserService,
    OccCartService,
    OccMiscsService,
    OccOrderService,
    {
      provide: OccModuleConfig,
      useExisting: Configuration
    }
  ]
})
export class OccModule {}
