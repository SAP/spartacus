import { CmsStructureConfig } from '@spartacus/core';
import {
  cartComponents,
  defaultCartPageConfig,
} from './default-cart-page.config';
import {
  defaultPageHeaderConfig,
  headerComponents,
} from './default-header.config';

export function defaultCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      components: { ...headerComponents, ...cartComponents },
      slots: {
        ...defaultPageHeaderConfig,
      },
      pages: [defaultCartPageConfig],
    },
  };
}
