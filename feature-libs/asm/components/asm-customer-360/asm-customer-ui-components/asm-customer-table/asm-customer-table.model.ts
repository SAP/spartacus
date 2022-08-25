import { KeyValuePair } from '../../asm-customer-360.model';

export interface CustomerTableColumn {
  text: string;
  property: string;
  sortOrder?: 'asc' | 'desc';
  renderAsStarRating?: boolean;
}

export interface TableEntry {
  [key: string]: string | Array<KeyValuePair> | number | undefined;
}
