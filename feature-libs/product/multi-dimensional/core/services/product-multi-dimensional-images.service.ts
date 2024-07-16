/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  Config,
  Image,
  OccConfig,
  VariantOptionQualifier,
  VariantQualifier,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalImagesService {
  protected config: Config = inject(Config);

  /**
   * Retrieves the images for variant option qualifiers that match the specified format.
   */
  getVariantOptionImages(
    variantOptionQualifiers: VariantOptionQualifier[],
    variantOptionValue: string
  ): Image[] {
    const format = VariantQualifier.SWATCH;
    return variantOptionQualifiers
      .filter((optionQualifier) => optionQualifier.image?.format === format)
      .map((optionQualifier) => {
        const altText = optionQualifier.image?.altText ?? variantOptionValue;
        return {
          altText,
          format: optionQualifier.image?.format,
          url: this.getBaseUrl() + optionQualifier.image?.url,
        };
      });
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
