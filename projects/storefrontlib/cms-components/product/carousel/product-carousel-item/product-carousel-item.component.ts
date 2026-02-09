/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, UrlPipe } from '@spartacus/core';
import { InnerComponentsHostDirective } from '../../../../cms-structure/page/component/inner-components-host.directive';
import { MediaComponent } from '../../../../shared/components/media/media.component';
import { LcpContextDirective } from '../../../../shared/lcp-context/lcp-context.directive';
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
  imports: [
    RouterLink,
    LcpContextDirective,
    MediaComponent,
    InnerComponentsHostDirective,
    AsyncPipe,
    UrlPipe,
  ],
})
export class ProductCarouselItemComponent implements OnChanges {
  /**
   * The product item to be displayed in the carousel.
   */
  @Input() item: Product;

  /**
   * The index of the item in the carousel.
   */
  @Input() itemIndex: number;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.item) {
      this.productListItemContextSource.product$.next(this.item);
    }
  }
}
