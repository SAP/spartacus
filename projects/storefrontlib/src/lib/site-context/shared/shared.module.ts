import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// services
import { ConfigService } from '../../../config.service';
import { SiteContextInterceptor } from './http-interceptors/site-context.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('siteContext', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SiteContextInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {
  static forRoot(config: any): any {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
