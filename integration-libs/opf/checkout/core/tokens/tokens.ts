/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ActiveConfiguration } from '@spartacus/opf/checkout/root';

export const OPF_ACTIVE_CONFIGURATION_NORMALIZER = new InjectionToken<
  Converter<any, ActiveConfiguration[]>
>('OpfActiveConfigurationNormalizer');
