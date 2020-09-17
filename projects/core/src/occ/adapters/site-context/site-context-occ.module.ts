import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { defaultOccSiteContextConfig } from './default-occ-site-context-config';
import { OccSiteAdapter } from './occ-site.adapter';
import { SiteContextInterceptor } from './site-context.interceptor';
import { provideDefaultConfig } from '../../../config/config-providers';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    provideDefaultConfig(defaultOccSiteContextConfig),
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
