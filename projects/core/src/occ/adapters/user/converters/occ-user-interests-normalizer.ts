/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ProductInterestSearchResult } from '../../../../model/product-interest.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccUserInterestsNormalizer
  implements
    Converter<Occ.ProductInterestSearchResult, ProductInterestSearchResult>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.ProductInterestSearchResult,
    target?: ProductInterestSearchResult
  ): ProductInterestSearchResult {
    if (target === undefined) {
      target = { ...(source as any) } as ProductInterestSearchResult;
    }
    if (source && source.results) {
      target.results = source.results.map((result) => ({
        ...result,
        product: this.converter.convert(result.product, PRODUCT_NORMALIZER),
      }));
    }

    return target;
  }
}
