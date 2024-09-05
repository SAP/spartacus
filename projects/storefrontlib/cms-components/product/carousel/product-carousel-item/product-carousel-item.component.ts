/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product, UrlModule } from '@spartacus/core';
import {
  ProductListItemContext,
  ProductListItemContextSource,
} from '../../product-list';
import { InnerComponentsHostDirective } from '../../../../cms-structure/page/component/inner-components-host.directive';
import { MediaComponent } from '../../../../shared/components/media/media.component';
import { RouterLink } from '@angular/router';

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
    standalone: true,
    imports: [
        RouterLink,
        MediaComponent,
        InnerComponentsHostDirective,
        UrlModule,
    ],
})
export class ProductCarouselItemComponent implements OnChanges {
  @Input() item: Product;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.item) {
      this.productListItemContextSource.product$.next(this.item);
    }
  }
}
