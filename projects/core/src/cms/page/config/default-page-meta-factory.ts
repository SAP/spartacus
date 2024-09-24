import { inject } from '@angular/core';
import { PageMetaConfig } from './page-meta.config';
import { FeatureToggles } from '../../../features-config';

export function defaultPageMetaFactory(): PageMetaConfig {
  const featureToggles = inject(FeatureToggles);

  return {
    pageMeta: {
      resolvers: [
        {
          property: 'title',
          method: 'resolveTitle',
        },
        {
          property: 'heading',
          method: 'resolveHeading',
        },
        {
          property: 'breadcrumbs',
          method: 'resolveBreadcrumbs',
        },
        {
          property: 'description',
          method: 'resolveDescription',
          disabledInCsr:
            !featureToggles.enableByDefaultMetaDescriptionAndCanonicalUrlInCsr,
        },
        {
          property: 'image',
          method: 'resolveImage',
          disabledInCsr: true,
        },
        {
          property: 'robots',
          method: 'resolveRobots',
          disabledInCsr: true,
        },
        {
          property: 'canonicalUrl',
          method: 'resolveCanonicalUrl',
          disabledInCsr:
            !featureToggles.enableByDefaultMetaDescriptionAndCanonicalUrlInCsr,
        },
      ],
      canonicalUrl: {
        forceHttps: true,
        forceWww: false,
        removeQueryParams: true,
        forceTrailingSlash: true,
      },
    },
  };
}
