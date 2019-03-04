import { ContentSlotData } from './content-slot-data.model';

export interface Page {
  uuid?: string;
  pageId?: string;
  catalogUuid?: string;
  name?: string;
  type?: string;
  title?: string;
  template?: string;
  loadTime?: number;
  slots: { [key: string]: ContentSlotData };
}

export interface PageMeta {
  title?: string;
  description?: string;
  robots?: PageRobotsMeta[];
}

export enum PageRobotsMeta {
  INDEX = 'INDEX',
  NOINDEX = 'NOINDEX',
  FOLLOW = 'FOLLOW',
  NOFOLLOW = 'NOFOLLOW'
}
