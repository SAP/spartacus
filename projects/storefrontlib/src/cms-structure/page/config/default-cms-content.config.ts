import { CmsStructureConfig } from '@spartacus/core';
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
        ...defaultPdpComponents,
      },
      slots: {
        ...defaultPageHeaderConfig,
        ...defaultPdpSlots,
      },
      pages: [],
    },
  };
}
