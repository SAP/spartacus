import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../../config/config-providers';
import { BASE_SITE_NORMALIZER } from '../../../site-context/connectors/converters';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { BaseSiteNormalizer } from './converters/base-site-normalizer';
import { defaultOccSiteContextConfig } from './default-occ-site-context-config';
import { OccSiteAdapter } from './occ-site.adapter';
import { SiteContextInterceptor } from './site-context.interceptor';

@NgModule({
  imports: [CommonModule],
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
    {
      provide: BASE_SITE_NORMALIZER,
      useExisting: BaseSiteNormalizer,
      multi: true,
    },
  ],
})
export class SiteContextOccModule {}
