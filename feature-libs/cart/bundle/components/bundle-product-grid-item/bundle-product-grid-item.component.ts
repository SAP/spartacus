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
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProductBtnActionTypes,
  ProductSelectionState,
} from '@spartacus/cart/bundle/core';
import { Product } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
// import { ProductDetailsDialogComponent } from '../../../product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'cx-bundle-product-grid-item',
  templateUrl: './bundle-product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleProductGridItemComponent {
  @Input() product: Product;
  @Input() selected: boolean;
  @Input() action: ProductBtnActionTypes;

  @Output() readonly selectProduct = new EventEmitter<ProductSelectionState>();
  @Output() readonly edit = new EventEmitter<string>();

  iconTypes = ICON_TYPE;
  btnActionTypes = ProductBtnActionTypes;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  toggleSelection(): void {
    console.log('toggle');
    this.selectProduct.next({
      isSelected: this.selected,
      product: this.product,
    });
  }

  checkDetails(): void {
    // const productDialogModalRef = this.launchDialogService.openDialog(
    //   ProductDetailsDialogComponent,
    //   {
    //     centered: true,
    //     size: 'lg',
    //   }
    // );
    // productDialogModalRef.componentInstance.product = this.product;
    // productDialogModalRef.componentInstance.select = () =>
    //   this.toggleSelection();

    // Add product code to queryParams to use CurrentProductService
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { productCode: this.product.code },
      queryParamsHandling: 'merge',
    });
  }

  editItem(): void {
    this.edit.next(this.product.code);
  }
}
