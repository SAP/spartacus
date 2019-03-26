import { CmsStructureConfig } from '@spartacus/core';
import { defaultPageHeaderConfig } from './default-header.config';
import { defaultCartPageConfig } from './default-cart-page.config';

export function defaultCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      slots: {
        ...defaultPageHeaderConfig
      },
      pages: [defaultCartPageConfig]
    }
  };
}
