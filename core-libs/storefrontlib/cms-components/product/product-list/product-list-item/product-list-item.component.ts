/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe, useFeatureStyles } from '@spartacus/core';
import { OutletDirective } from '../../../../cms-structure/outlet/outlet.directive';
import { InnerComponentsHostDirective } from '../../../../cms-structure/page/component/inner-components-host.directive';
import { MediaComponent } from '../../../../shared/components/media/media.component';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { LcpContextDirective } from '../../../../shared/lcp-context/lcp-context.directive';
import { ProductListOutlets } from '../../product-outlets.model';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'cx-product-list-item',
  templateUrl: './product-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
  imports: [
    RouterLink,
    LcpContextDirective,
    MediaComponent,
    OutletDirective,
    NgIf,
    StarRatingComponent,
    InnerComponentsHostDirective,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
  ],
})
export class ProductListItemComponent implements OnChanges {
  protected productListService = inject(ProductListService);
  hideAddToCartButton = false;

  readonly ProductListOutlets = ProductListOutlets;

  /**
   * The product item to be displayed in the list.
   */
  @Input() product: any;

  /**
   * The index of the item in the product list.
   */
  @Input() itemIndex?: number;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {
    useFeatureStyles('consistentSizeProductCards');
  }

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.product) {
      this.hideAddToCartButton = this.hideAddToCartButton =
        this.productListService.shouldHideAddToCartButton(this.product);
      this.productListItemContextSource.product$.next(this.product);
    }
  }
}
