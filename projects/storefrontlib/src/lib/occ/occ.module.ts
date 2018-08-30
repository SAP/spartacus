import { NgModule, ModuleWithProviders } from '@angular/core';
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

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccProductSearchService,
    OccProductService,
    OccSiteService,
    OccUserService,
    OccCartService,
    OccMiscsService,
    OccOrderService
  ]
})
export class OccModule {
  static forRoot(configOverride?: any): ModuleWithProviders {
    return {
      ngModule: OccModule,
      providers: [
        {
          provide: OccModuleConfig,
          useValue: { ...new OccModuleConfig(), ...configOverride }
        }
      ]
    };
  }
}
