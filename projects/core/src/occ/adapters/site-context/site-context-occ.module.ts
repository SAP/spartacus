import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OccSiteAdapter } from './occ-site.adapter';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { SiteContextInterceptor } from './site-context.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: SiteAdapter,
      useClass: OccSiteAdapter,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SiteContextInterceptor,
      multi: true,
    },
  ],
})
export class SiteContextOccModule {}
