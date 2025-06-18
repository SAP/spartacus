/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter, ConsentTemplate } from '@spartacus/core';
import { CdcConsent } from '../model';

/**
 * @deprecated since 2211.38
 */
// CXSPA-9292: remove this in next major release
//maintaining target as any because 'preferences' in cdc can have any structure
export const CDC_USER_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<ConsentTemplate, any>
>('CdcUserPreferenceSerializer');

export const CDC_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<CdcConsent[], any>
>('CdcPreferenceSerializer');
