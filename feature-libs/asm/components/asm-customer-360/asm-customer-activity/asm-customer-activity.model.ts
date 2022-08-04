import { TableFragment } from '../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';
import { formatDate } from '@angular/common';
import { keyValuePair } from '../asm-customer-360.model';
import { replaceTokens } from '../asm-customer-360.utils';
import {
  RawTableEntry,
  TableEntry,
  TableEntryCell,
} from '../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

export interface RawGeneralEntry extends RawTableEntry {
  type?: string;
  id?: string;
  description?: string;
  descriptionArgs?: Array<keyValuePair>;
  category?: string;
  created?: number;
  updated?: number;
  url?: string;
}

export class GeneralEntry extends TableEntry {
  type: TableEntryCell;
  id: TableEntryCell;
  description: TableEntryCell;
  status: TableEntryCell;
  created: TableEntryCell;
  updated: TableEntryCell;

  constructor(entry: RawGeneralEntry) {
    super();
    this.type = {
      value: entry.type,
    };
    this.id = {
      value: entry.id,
      details: {
        url: entry.url,
        reverseSort: true,
      },
    };
    this.description = {
      value: replaceTokens(entry.description, entry.descriptionArgs),
    };
    this.status = {
      value: entry.category,
    };
    this.created = {
      value: entry.created,
      text: entry.created
        ? formatDate(entry.created, 'dd-MM-yy hh:mm a', 'en-US')
        : undefined,
      details: {
        reverseSort: true,
      },
    };
    this.updated = {
      value: entry.updated,
      text: entry.updated
        ? formatDate(entry.updated, 'dd-MM-yy hh:mm a', 'en-US')
        : undefined,
      details: {
        reverseSort: true,
      },
    };
  }
}

export class GeneralFragment extends TableFragment {
  type = 'general';
  text = 'General';
  emptyText = 'There is currently no recorded customer activity';

  constructor(entries: Array<RawGeneralEntry>) {
    super(entries, 'updated', GeneralEntry, 10);
  }
}
