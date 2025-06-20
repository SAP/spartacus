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
import { MEDIA_PRIORITY_CONTEXT } from 'projects/storefrontlib/cms-structure/media-priority/media-priority-context.token';
import { map } from 'rxjs';
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

  protected mediaPriorityContext$ = inject(MEDIA_PRIORITY_CONTEXT);
  fetchPriority$ = this.mediaPriorityContext$.pipe(
    map((context) => context.fetchPriority)
  );

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.item) {
      this.productListItemContextSource.product$.next(this.item);
    }
  }
}
