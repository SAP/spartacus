/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ActiveConfiguration } from '@spartacus/opf/base/root';

export const OPF_ACTIVE_CONFIGURATIONS_NORMALIZER = new InjectionToken<
  Converter<any, ActiveConfiguration[]>
>('OpfActiveConfigurationsNormalizer');
