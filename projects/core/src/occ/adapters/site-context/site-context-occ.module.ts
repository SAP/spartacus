import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { defaultOccSiteContextConfig } from './default-occ-site-context-config';
import { OccSiteAdapter } from './occ-site.adapter';
import { SiteContextInterceptor } from './site-context.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccSiteContextConfig),
  ],
  providers: [
    {
      provide: SiteAdapter,
      useClass: OccSiteAdapter,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: SiteContextInterceptor,
      multi: true,
    },
  ],
})
export class SiteContextOccModule {}
