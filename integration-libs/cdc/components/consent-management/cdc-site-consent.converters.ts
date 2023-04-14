/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { ConsentTemplate, Converter } from '@spartacus/core';

export const CDC_CONSENT_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, ConsentTemplate[]>
>('CdcConsentDetailsNormalizer');


