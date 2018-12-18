import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SiteContextInterceptor } from './site-context.interceptor';
import { OccSiteService } from './occ-site.service';
import { OccModule } from '../../occ/occ.module';
@NgModule({
  imports: [OccModule, CommonModule, HttpClientModule],
  providers: [
    OccModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SiteContextInterceptor,
      multi: true
    },
    OccSiteService
  ]
})
export class SiteContextOccModule {}
