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
      // @TODO (#10467) disable (`disabledInCsr`) description, image and robots resolvers to optimize resolving logic
      {
        property: 'description',
        method: 'resolveDescription',
      },
      {
        property: 'image',
        method: 'resolveImage',
      },
      {
        property: 'robots',
        method: 'resolveRobots',
      },
    ],
  },
};
