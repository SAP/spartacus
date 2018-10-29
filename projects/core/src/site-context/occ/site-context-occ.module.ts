import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SiteContextInterceptor } from './site-context.interceptor';
import { OccSiteService } from './occ-site.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SiteContextInterceptor,
      multi: true
    },
    OccSiteService
  ]
})
export class SiteContextOccModule {}
