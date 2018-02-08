import { OccProductService } from './product/product.service';
import { OccProductSearchService } from './product/product-search.service';
import { OccSiteService } from './site-context/occ-site.service';

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

// import { OccCoreModule } from './occ-core/occ-core.module';
import { ConfigService } from './config.service';

// add a custom http client so that we can intercept every call and
// provide the access token
import { HttpClient } from './http-client';
import { RequestOptions, Http, XHRBackend, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { OccUserService } from '../newocc/user.service';

function httpClientFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  configService: ConfigService
): Http {
  return new HttpClient(xhrBackend, requestOptions, configService);
}

@NgModule({
  imports: [CommonModule, HttpModule, HttpClientModule],
  providers: [
    OccProductSearchService,
    OccProductService,
    OccSiteService,
    OccUserService,
    {
      provide: HttpClient,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions, ConfigService]
    }
  ]
})
export class NewOccModule {
  static forRoot(config: any): any {
    return {
      ngModule: NewOccModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
