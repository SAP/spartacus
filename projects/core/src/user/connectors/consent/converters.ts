/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ConsentTemplate } from '../../../model/consent.model';

export const CONSENT_TEMPLATE_NORMALIZER = new InjectionToken<
  Converter<any, ConsentTemplate>
>('ConsentTemplateNormalizer');
