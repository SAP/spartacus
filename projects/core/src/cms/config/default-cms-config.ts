import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  backend: {
    occ: {
      endpoints: {
        component: 'cms/components/${id}',
        components: 'cms/components',
        pages: 'cms/pages',
        page: 'cms/pages/${id}',
      },
    },
  },
  cmsComponents: {},
  pageResolvers: {
    // The following resolvers will be deactivated for CSR in 4.0: 'resolveImage', 'resolveDescription', 'resolveRobots'
    disableInCSR: [],
  },
};
