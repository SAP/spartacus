/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { map } from 'rxjs';
import { LCP_CONTEXT } from '../../../../cms-structure/lcp-context/lcp-context.model';
import { LcpToFetchPriorityService } from '../../../../cms-structure/lcp-context/lcp-to-fetch-priority.service';
import { ProductListOutlets } from '../../product-outlets.model';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
  standalone: false,
})
export class ProductGridItemComponent implements OnChanges {
  protected productListService = inject(ProductListService);
  hideAddToCartButton = false;

  readonly ProductListOutlets = ProductListOutlets;
  @Input() product: any;

  @Input() itemIndex?: number;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.product) {
      this.hideAddToCartButton =
        this.productListService.shouldHideAddToCartButton(this.product);
      this.productListItemContextSource.product$.next(this.product);
    }
  }

  protected lcpContext$ = inject(LCP_CONTEXT);

  // SPIKE TODO: replace with a separate directive
  protected lcpToFetchPriorityService = inject(LcpToFetchPriorityService);
  protected fetchPriority$ = this.lcpContext$.pipe(
    map((lcpContext) => this.lcpToFetchPriorityService.map(lcpContext))
  );
}
