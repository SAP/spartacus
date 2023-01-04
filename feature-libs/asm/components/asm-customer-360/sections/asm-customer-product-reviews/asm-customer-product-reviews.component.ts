/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { Product } from '@spartacus/core';
import { Subscription } from 'rxjs';

import { combineStrings, formatEpochTime } from '../../asm-customer-360.utils';
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
})
export class AsmCustomerProductReviewsComponent implements OnDestroy, OnInit {
  reviewColumns: Array<CustomerTableColumn> = [
    { property: 'item', text: 'item', navigatable: true },
    { property: 'dateAndStatus', text: 'DATE / STATUS' },
    { property: 'rating', text: 'rate', renderAsStarRating: true },
    { property: 'reviewText', text: 'review' },
  ];

  reviewEntries: Array<ReviewEntry>;

  protected subscription = new Subscription();

  constructor(
    protected context: Customer360SectionContext<AsmCustomer360ReviewList>
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.context.data$.subscribe((data) => {
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
        }));
      })
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
}
