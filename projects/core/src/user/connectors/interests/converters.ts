/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';

export const PRODUCT_INTERESTS_NORMALIZER = new InjectionToken<
  Converter<any, ProductInterestSearchResult>
>('ProductInterestsNormalizer');
