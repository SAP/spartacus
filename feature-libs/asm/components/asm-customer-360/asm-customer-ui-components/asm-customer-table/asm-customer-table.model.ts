import { KeyValuePair } from '../../asm-customer-360.model';

export interface CustomerTableColumn {
  text: string;
  property: string;
  sortOrder?: 'asc' | 'desc';
  renderAsStarRating?: boolean;
  /** If truthy, use the value to read the value from the entry to link to. */
  urlProperty?: string;
}

export interface TableEntry {
  [key: string]: string | Array<KeyValuePair> | number | undefined;
}
