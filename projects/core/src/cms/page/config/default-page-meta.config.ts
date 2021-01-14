import { PageMetaConfig } from './page-meta.config';

export const defaultPageMetaConfig: PageMetaConfig = {
  pageResolvers: {
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
      // SSR only resolvers
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
    ],
  },
};
