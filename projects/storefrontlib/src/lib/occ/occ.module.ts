import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../config.service';
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
import { DefaultConfigService } from '../../default-config.service';

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
export class OccModule {
  static forRoot(config: any): any {
    const configServiceFactory = (
      appConfigService: ConfigService,
      defaultConfigService: ConfigService
    ) => {
      console.log(
        'OccModule configServiceFactory provided appConfigService',
        appConfigService
      );
      console.log(
        'OccModule configServiceFactory provided defaultConfigService',
        defaultConfigService
      );
      return { ...defaultConfigService, ...appConfigService };
    };
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: configServiceFactory,
      deps: [config, DefaultConfigService]
    };

    return {
      ngModule: OccModule,
      providers: [
        configServiceProvider,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationTokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
