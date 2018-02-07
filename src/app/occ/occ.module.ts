import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { OccCoreModule } from './occ-core/occ-core.module';
import { ConfigService } from './config.service';

// add a custom http client so that we can intercept every call and
// provide the access token
import { HttpClient } from './http-client';
import { RequestOptions, Http, XHRBackend } from '@angular/http';
function httpClientFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  configService: ConfigService
): Http {
  return new HttpClient(xhrBackend, requestOptions, configService);
}

@NgModule({
  imports: [CommonModule, HttpModule, OccCoreModule.forRoot(ConfigService)],
  providers: [
    HttpClient,
    {
      provide: Http,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions, ConfigService]
    }
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
