import { CmsStructureConfig } from '@spartacus/core';
import {
  defaultPageHeaderConfig,
  headerComponents,
} from './default-header.config';

export function defaultCmsContentConfig(): CmsStructureConfig {
  return {
    cmsStructure: {
      components: {
        ...headerComponents,
      },
      slots: {
        ...defaultPageHeaderConfig,
      },
      pages: [],
    },
  };
}
