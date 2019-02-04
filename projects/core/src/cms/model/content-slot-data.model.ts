import { ContentSlotComponentData } from './content-slot-component-data.model';

export interface ContentSlotData {
  uid?: string;
  uuid?: string;
  catalogUuid?: string;
  components?: ContentSlotComponentData[];
}
