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
  seen?: Array<string>;
  slots: { [key: string]: ContentSlotData };
}
