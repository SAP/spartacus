/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product, VariantMatrixElement } from 'projects/core/src/model';
import { Router } from '@angular/router';
import { VariantsCategories } from '../model/augmented-core.model';

@Injectable({ providedIn: 'root' })
export class VariantsMultiDimensionalService {
  constructor(protected router: Router) {}

  variantHasImages(variants: any[]): boolean {
    return variants.some(
      (variant: VariantMatrixElement) => variant.parentVariantCategory?.hasImage
    );
  }

  getVariants(product: Product): VariantsCategories[] {
    return product && product.variantMatrix
      ? this.groupVariantsByCategory(product)
      : [];
  }

  groupVariantsByCategory(_product: Product): VariantsCategories[] {
    return [];
  }
}
