import { KeyValuePair } from '../../asm-customer-360.model';
import { TableEntry } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

export interface GeneralEntry extends TableEntry {
  type?: string;
  id?: string;
  description?: string;
  descriptionArgs?: Array<KeyValuePair>;
  category?: string;
  created?: number;
  updated?: number;
  url?: string;
}
