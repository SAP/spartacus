/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { map } from 'rxjs';
import { LCP_CONTEXT } from '../../../../cms-structure/lcp-context/lcp-context.model';
import { LcpToFetchPriorityService } from '../../../../cms-structure/lcp-context/lcp-to-fetch-priority.service';
import {
  ProductListItemContext,
  ProductListItemContextSource,
} from '../../product-list';

@Component({
  selector: 'cx-product-carousel-item',
  templateUrl: './product-carousel-item.component.html',
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProductCarouselItemComponent implements OnChanges {
  @Input() item: Product;

  @Input() itemIndex?: number;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.item) {
      this.productListItemContextSource.product$.next(this.item);
    }
  }

  protected lcpContext$ = inject(LCP_CONTEXT);

  // SPIKE TODO: replace with a separate directive
  protected lcpToFetchPriorityService = inject(LcpToFetchPriorityService);
  protected fetchPriority$ = this.lcpContext$.pipe(
    map((lcpContext) => this.lcpToFetchPriorityService.map(lcpContext))
  );
}
