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
};
