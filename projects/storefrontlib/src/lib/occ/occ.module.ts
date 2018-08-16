import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';

import { OccUserService } from './user/user.service';
import { OccProductService } from './product/product.service';
import { OccProductSearchService } from './product/product-search.service';
import { OccSiteService } from './site-context/occ-site.service';
import { OccCartService } from './cart/cart.service';
import { OccMiscsService } from './miscs/miscs.service';
import { OccOrderService } from './order/order.service';
import { OccStoreFinderService } from './store/store-finder.service';
import { OccClientAuthenticationTokenService } from './client-authentication/client-authentication-token.service';
import { OccE2eConfigurationService } from './e2e/configuration-service';

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
    OccE2eConfigurationService
  ]
})
export class OccModule {
  static forRoot(config: any): any {
    return {
      ngModule: OccModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
