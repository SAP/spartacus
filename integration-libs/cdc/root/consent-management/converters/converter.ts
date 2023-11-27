/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter, ConsentTemplate } from '@spartacus/core';

//maintaining target as any because 'preferences' in cdc can have any structure
export const CDC_USER_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<ConsentTemplate, any>
>('CdcUserPreferenceSerializer');
