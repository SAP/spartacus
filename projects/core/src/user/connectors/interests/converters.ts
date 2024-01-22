/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_INTERESTS_NORMALIZER = new InjectionToken<
  Converter<any, ProductInterestSearchResult>
>('ProductInterestsNormalizer');
