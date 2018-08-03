import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationTokenInterceptor } from './http-interceptors/authentication-token.interceptor';
import { OccUserService } from './user/user.service';
import { OccProductService } from './product/product.service';
import { OccProductSearchService } from './product/product-search.service';
import { OccSiteService } from './site-context/occ-site.service';
import { OccCartService } from './cart/cart.service';
import { OccMiscsService } from './miscs/miscs.service';
import { OccOrderService } from './order/order.service';
import { OccClientAuthenticationTokenService } from './client-authentication/client-authentication-token.service';
import { AbstractStorefrontModule } from '../../abstract-storefront-module';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccClientAuthenticationTokenService,
    OccProductSearchService,
    OccProductService,
    OccSiteService,
    OccUserService,
    OccCartService,
    OccMiscsService,
    OccOrderService
  ]
})
export class OccModule extends AbstractStorefrontModule {
  static forRoot(config: any): any {
    const overriddenConfigProvider = this.getOverriddenConfigProvider(config);
    return {
      ngModule: OccModule,
      providers: [
        overriddenConfigProvider,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationTokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
