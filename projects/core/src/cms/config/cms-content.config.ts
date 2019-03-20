import { CmsConfig } from './cms-config';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';

export interface PageConfig {
  /**
   * When the `ignoreBackend` is set to true, the CMS backend
   * will not be consumed. This saves network latency and is
   * useful for commodity commerce pages.
   * */
  ignoreBackend?: boolean;

  pageId?: string;
  type?: string;
  title?: string;
  template?: string;
  slots: { [key: string]: ContentSlotDataConfig };
}

export interface ContentSlotDataConfig {
  uid?: string;
  components?: (ContentSlotComponentData | any)[];
}

export abstract class CmsContentConfig extends CmsConfig {
  cmsData: {
    pages?: PageConfig[];
    slots?: { [key: string]: ContentSlotDataConfig };
  };
}
