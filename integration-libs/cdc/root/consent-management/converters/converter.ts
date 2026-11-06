/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { CdcConsent } from '../model';

export const CDC_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<CdcConsent[], any>
>('CdcPreferenceSerializer');
