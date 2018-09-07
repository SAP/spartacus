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
import { OccStoreFinderService } from './store/store-finder.service';
import { OccE2eConfigurationService } from './e2e/e2e-configuration-service';

export function overrideOccModuleConfig(configOverride: any) {
  return { ...new OccModuleConfig(), ...configOverride };
}

export const OCC_MODULE_CONFIG_OVERRIDE: InjectionToken<
  string
> = new InjectionToken<string>('OCC_MODULE_CONFIG_OVERRIDE');

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
  static forRoot(configOverride?: any): ModuleWithProviders {
    return {
      ngModule: OccModule,
      providers: [
        {
          provide: OCC_MODULE_CONFIG_OVERRIDE,
          useValue: configOverride
        },
        {
          provide: OccModuleConfig,
          useFactory: overrideOccModuleConfig,
          deps: [OCC_MODULE_CONFIG_OVERRIDE]
        }
      ]
    };
  }
}
