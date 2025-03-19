/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OpfActiveConfigurationsResponse } from '@spartacus/opf/base/root';

export const OPF_ACTIVE_CONFIGURATIONS_NORMALIZER = new InjectionToken<
  Converter<any, OpfActiveConfigurationsResponse>
>('OpfActiveConfigurationsNormalizer');
