import { CmsStructureConfig } from '@spartacus/core';
import {
  cartComponents,
  defaultCartPageConfig,
} from './default-cart-page.config';
import {
  defaultPageHeaderConfig,
  headerComponents,
} from './default-header.config';
import { defaultPdpComponents, defaultPdpSlots } from './default-pdp-config';

export function defaultCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      components: {
        ...headerComponents,
        ...cartComponents,
        ...defaultPdpComponents,
      },
      slots: {
        ...defaultPageHeaderConfig,
        ...defaultPdpSlots,
      },
      pages: [defaultCartPageConfig],
    },
  };
}
