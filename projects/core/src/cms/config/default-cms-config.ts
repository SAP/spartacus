import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  backend: {
    occ: {
      endpoints: {
        component: 'cms/components/${id}',
        components: 'cms/components?fields=${fields}',
        pages: 'cms/pages?fields=${fields}',
        page: 'cms/pages/${id}?fields=${fields}',
      },
      legacy: false,
    },
  },
};
