import { formatDate } from '@angular/common';
import { TranslationService } from '@spartacus/core';
import { keyValuePair } from '../asm-customer-360.model';
import { replaceTokens, combineStrings } from '../asm-customer-360.utils';
import {
  RawTableEntry,
  TableEntry,
  TableEntryCell,
  TableFragment,
} from '../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

export interface RawTicketEntry extends RawTableEntry {
  type?: string;
  id?: string;
  description?: string;
  descriptionArgs?: Array<keyValuePair>;
  category?: string;
  created?: number;
  updated?: number;
  url?: string;
}

export interface RawReviewEntry extends RawTableEntry {
  productName?: string;
  SKUNumber?: string;
  rating?: number;
  reviewStatus?: string;
  reviewText?: string;
  productUrl?: string;
  created?: number;
}

export class TicketEntry extends TableEntry {
  id: TableEntryCell;
  headline: TableEntryCell;
  category: TableEntryCell;
  status: TableEntryCell;
  created: TableEntryCell;
  updated: TableEntryCell;

  constructor(entry: RawTicketEntry) {
    super();
    this.id = {
      value: entry.id,
      details: {
        url: entry.url,
        reverseSort: true,
      },
    };
    this.headline = {
      value: replaceTokens(entry.description, entry.descriptionArgs),
    };
    this.category = {
      value: entry.type,
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

export class ReviewEntry extends TableEntry {
  item: TableEntryCell;
  dateAndStatus: TableEntryCell;
  rate: TableEntryCell;
  review: TableEntryCell;

  constructor(entry: RawReviewEntry) {
    super();
    this.item = {
      value: combineStrings(entry.productName, entry.SKUNumber),
      text: combineStrings(entry.productName, entry.SKUNumber, ', SKU: '),
      details: {
        url: entry.productUrl,
      },
    };
    this.dateAndStatus = {
      value: combineStrings(entry.created?.toString(), entry.reviewStatus),
      text: combineStrings(
        entry.created
          ? formatDate(entry.created, 'dd-MM-yy', 'en-US')
          : undefined,
        entry.reviewStatus,
        ' / '
      ),
      details: {
        reverseSort: true,
      },
    };
    this.rate = {
      value: entry.rating,
      details: {
        starRating: true,
        reverseSort: true,
      },
    };
    this.review = {
      value: entry.reviewText,
    };
  }
}

export class TicketFragment extends TableFragment {
  type = 'tickets';
  text = this.translation.translate('asm.customer360.feedBackTabSupportTitle');
  emptyText = this.translation.translate(
    'asm.customer360.feedBackTabSupportEmptyText'
  );

  constructor(
    protected translation: TranslationService,
    entries: Array<RawTableEntry>
  ) {
    super(translation, entries, 'updated', TicketEntry);
  }
}

export class ReviewFragment extends TableFragment {
  type = 'reviews';
  text = this.translation.translate(
    'asm.customer360.feedBackTabProductReviewsTitle'
  );
  emptyText = this.translation.translate(
    'asm.customer360.feedBackTabProductReviewsEmptyText'
  );

  constructor(
    protected translation: TranslationService,
    entries: Array<RawTableEntry>
  ) {
    super(translation, entries, 'dateAndStatus', ReviewEntry);
  }
}
