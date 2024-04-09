/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@spartacus/core';
import { LaunchDialogService, ProductListItemContext, ProductListItemContextSource } from '@spartacus/storefront';
import { BundleProductListOutlets } from '../../bundle-outlets.model';

@Component({
  selector: 'cx-bundle-product-list-item',
  templateUrl: './bundle-product-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class BundleProductListItemComponent implements OnChanges {
  readonly BundleProductListOutlets = BundleProductListOutlets;
  @Input() product: Product;
  @Output() checkDetails = new EventEmitter<Product>();

  constructor(
    protected productListItemContextSource: ProductListItemContextSource,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.product) {
      this.productListItemContextSource.product$.next(this.product);
    }
  }

  onCheckDetails(): void {
    this.checkDetails.emit(this.product);
  }
}
