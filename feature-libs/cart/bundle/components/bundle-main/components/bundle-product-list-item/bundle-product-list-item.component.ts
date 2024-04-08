/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { ActivatedRoute, Router } from '@angular/router';
import { LAUNCH_CALLER, LaunchDialogService, ProductListItemContext, ProductListItemContextSource } from '@spartacus/storefront';
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
  @Input() product: any;

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

  checkDetails(): void {
    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: { productCode: this.product.code },
    //   queryParamsHandling: 'merge',
    // });

    const data = { product: this.product, function: () => console.log(this.product.code + 'selected')};
    this.launchDialogService?.openDialogAndSubscribe(
      LAUNCH_CALLER.PRODUCT_DETAILS_DIALOG,
      undefined,
      data
    );
  }
}
