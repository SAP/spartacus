import { ContentSlotData } from './content-slot-data.model';

export interface Page {
  uuid?: string;
  pageId?: string;
  catalogUuid?: string;
  name?: string;
  title?: string;
  template?: string;
  loadTime?: number;
  // TODO:#1135 - remove
  seen?: Array<string>;
  slots: { [key: string]: ContentSlotData };
}
