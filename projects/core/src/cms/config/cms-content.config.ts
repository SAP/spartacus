import { CmsConfig } from './cms-config';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';

export interface PageConfig {
  ignoreBackend?: boolean;

  pageId?: string;
  type?: string;
  title?: string;
  template?: string;
  // uuid?: string;
  // catalogUuid?: string;
  // name?: string;

  // loadTime?: number;
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
