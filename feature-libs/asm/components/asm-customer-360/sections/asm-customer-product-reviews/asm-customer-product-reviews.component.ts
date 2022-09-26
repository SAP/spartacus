import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/core';
import { AsmCustomer360ReviewList } from '@spartacus/asm/root';
import { SemanticPathService } from '@spartacus/core';
import { Customer360SectionData } from 'feature-libs/asm/core/models/customer-360-section-data';

import { combineStrings, formatEpochTime } from '../../asm-customer-360.utils';
import { CustomerTableColumn } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-product-reviews',
  templateUrl: './asm-customer-product-reviews.component.html',
})
export class AsmCustomerProductReviewsComponent {
  reviewColumns: Array<CustomerTableColumn> = [
    { property: 'item', text: 'item' },
    { property: 'dateAndStatus', text: 'DATE / STATUS' },
    { property: 'rating', text: 'rate', renderAsStarRating: true },
    { property: 'reviewText', text: 'review' },
  ];

  reviewEntries: Array<any>;

  constructor(
    public config: Customer360SectionConfig,
    protected sectionData: Customer360SectionData<AsmCustomer360ReviewList>,
    /** TODO: Importing this seems questionable. */
    protected semanticPathService: SemanticPathService
  ) {
    this.reviewEntries = sectionData.data.reviews.map((entry) => ({
      ...entry,
      item: combineStrings(entry.productName, entry.productCode, ', SKU: '),
      dateAndStatus: combineStrings(
        entry.createdAt
          ? formatEpochTime(Number(new Date(entry.createdAt)))
          : undefined,
        entry.reviewStatus,
        ' / '
      ),
      // productUrl: this.semanticPathService.transform({ cxRoute: 'product', params: { code: entry.productCode, slug: entry.productName } }),
    }));
  }
}
