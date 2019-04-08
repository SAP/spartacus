import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTabParagraphComponent: { selector: 'cx-paragraph' },
  },
  endpoints: {
    component: 'cms/components/${id}',
    components: 'cms/components?fields=${fields}',
    pages: 'cms/pages?fields=${fields}',
  },
};
