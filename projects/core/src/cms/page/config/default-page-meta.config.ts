import { PageMetaConfig } from './page-meta.config';

export const defaultPageMetaConfig: PageMetaConfig = {
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
        disabledInCsr: true,
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
        disabledInCsr: true,
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
