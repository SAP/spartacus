/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsmCustomer360ReviewList } from '@spartacus/asm/root';
import { CxDatePipe, Product, TranslationService } from '@spartacus/core';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CustomerTableColumn,
  TableEntry,
} from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { ReviewEntry } from './asm-customer-product-reviews.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-product-reviews',
  templateUrl: './asm-customer-product-reviews.component.html',
  providers: [CxDatePipe],
})
export class AsmCustomerProductReviewsComponent implements OnDestroy, OnInit {
  reviewColumns: Array<CustomerTableColumn> = [
    {
      property: 'item',
      text: 'item',
      i18nTextKey: 'asm.customer360.productReviews.columnHeaders.item',
      navigatable: true,
    },
    {
      property: 'dateAndStatus',
      i18nTextKey: 'asm.customer360.productReviews.columnHeaders.dateAndStatus',
      text: 'DATE / STATUS',
    },
    {
      property: 'rating',
      i18nTextKey: 'asm.customer360.productReviews.columnHeaders.rating',
      text: 'rate',
      renderAsStarRating: true,
    },
    {
      property: 'reviewText',
      i18nTextKey: 'asm.customer360.productReviews.columnHeaders.review',
      text: 'review',
    },
  ];

  reviewEntries: Array<ReviewEntry>;

  protected subscription = new Subscription();

  constructor(
    protected context: Customer360SectionContext<AsmCustomer360ReviewList>,
    protected datePipe: CxDatePipe,
    protected translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.context.data$,
        this.translation.translate('asm.customer360.productReviews.sku'),
      ])
        .pipe(
          map(([data, skuLabel]) => {
            this.reviewEntries = data.reviews.map((entry) => ({
              ...entry,
              item: `${entry.productName}, ${skuLabel} ${entry.productCode}`,
              dateAndStatus: `${this.getLongDate(
                new Date(entry.createdAt)
              )} / ${entry.reviewStatus}`,
            }));
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateTo(entry: TableEntry): void {
    const params: Product = {
      name: entry.productName as string,
      code: entry.productCode as string,
    };
    this.context.navigate$.next({ cxRoute: 'product', params });
  }

  private getLongDate(date: Date) {
    if (!date) {
      return '';
    }
    return this.datePipe.transform(date, 'dd-MM-yy hh:mm a') || '';
  }
}
