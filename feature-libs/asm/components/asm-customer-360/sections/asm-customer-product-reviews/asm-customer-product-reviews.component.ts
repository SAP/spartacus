import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AsmCustomer360ReviewList } from '@spartacus/asm/root';
import { SemanticPathService } from '@spartacus/core';
import { Subscription } from 'rxjs';

import { combineStrings, formatEpochTime } from '../../asm-customer-360.utils';
import { CustomerTableColumn } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-product-reviews',
  templateUrl: './asm-customer-product-reviews.component.html',
})
export class AsmCustomerProductReviewsComponent implements OnDestroy {
  reviewColumns: Array<CustomerTableColumn> = [
    { property: 'item', text: 'item' },
    { property: 'dateAndStatus', text: 'DATE / STATUS' },
    { property: 'rating', text: 'rate', renderAsStarRating: true },
    { property: 'reviewText', text: 'review' },
  ];

  reviewEntries: Array<any>;

  protected subscription = new Subscription();

  constructor(
    protected context: Customer360SectionContext<AsmCustomer360ReviewList>,
    /** TODO: Importing this seems questionable. */
    protected semanticPathService: SemanticPathService
  ) {
    this.subscription.add(
      context.data$.subscribe((data) => {
        this.reviewEntries = data.reviews.map((entry) => ({
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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
