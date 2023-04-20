/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { ConsentTemplate, Converter } from '@spartacus/core';

export const CDC_SITE_CONSENT_NORMALIZER = new InjectionToken<
  Converter<any, ConsentTemplate[]>
>('CdcSiteConsentNormalizer');

export const CDC_USER_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<ConsentTemplate, any>
>('CdcUserPreferenceSerializer');
