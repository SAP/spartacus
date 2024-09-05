/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BaseOption,
  isNotNullable,
  Product,
  RequiredPick,
  VariantType,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ProductVariantColorSelectorComponent } from '../variant-color-selector/product-variant-color-selector.component';
import { ProductVariantSizeSelectorComponent } from '../variant-size-selector/product-variant-size-selector.component';
import { ProductVariantStyleSelectorComponent } from '../variant-style-selector/product-variant-style-selector.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-product-variants-container',
    templateUrl: './product-variants-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        ProductVariantStyleSelectorComponent,
        ProductVariantSizeSelectorComponent,
        ProductVariantColorSelectorComponent,
        AsyncPipe,
    ],
})
export class ProductVariantsContainerComponent implements OnInit {
  constructor(private currentProductService: CurrentProductService) {}

  variants: { [key: string]: BaseOption } = {};
  variantType = VariantType;
  product$: Observable<Product | null>;

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter(isNotNullable),
      filter(
        (product): product is RequiredPick<Product, 'baseOptions'> =>
          !!product.baseOptions
      ),
      distinctUntilChanged(),
      tap((product) => {
        product.baseOptions.forEach((option: BaseOption) => {
          if (option?.variantType) {
            this.variants[option.variantType] = option;
          }
        });
      })
    );
  }
}
