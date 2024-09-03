/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Config, Image, VariantOptionQualifier } from '@spartacus/core';
import { ProductMultiDimensionalConfig } from '@spartacus/product-multi-dimensional/selector/root';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalSelectorImagesService {
  protected config: Config = inject(Config);

  /**
   * Retrieves the image for variant option qualifiers that match the specified format.
   */
  getVariantOptionImage(
    variantOptionQualifiers: VariantOptionQualifier[],
    variantOptionValue: string
  ): Image | undefined {
    const format = (this.config as ProductMultiDimensionalConfig)
      .multiDimensional?.imageFormat;
    const optionImage = variantOptionQualifiers.find(
      (optionQualifier) => optionQualifier.image?.format === format
    );

    const altText = optionImage?.image?.altText ?? variantOptionValue;
    return optionImage
      ? {
          altText,
          url: this.getBaseUrl() + optionImage?.image?.url,
        }
      : undefined;
  }

  protected getBaseUrl(): string {
    return (
      this.config.backend?.media?.baseUrl ??
      this.config.backend?.occ?.baseUrl ??
      ''
    );
  }
}
