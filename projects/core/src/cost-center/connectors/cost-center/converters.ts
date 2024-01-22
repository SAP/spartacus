/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { EntitiesModel } from '../../../model/misc.model';
import { CostCenter } from '../../../model/org-unit.model';
import { Converter } from '../../../util/converter.service';

export const COST_CENTER_NORMALIZER = new InjectionToken<
  Converter<any, CostCenter>
>('CostCenterNormalizer');

export const COST_CENTERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<CostCenter>>
>('CostCentersListNormalizer');

export const COST_CENTER_SERIALIZER = new InjectionToken<
  Converter<CostCenter, any>
>('CostCenterSerializer');
