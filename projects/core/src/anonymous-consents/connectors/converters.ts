/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { AnonymousConsent } from '../../model/consent.model';
import { Converter } from '../../util/converter.service';

export const ANONYMOUS_CONSENT_NORMALIZER = new InjectionToken<
  Converter<string, AnonymousConsent[]>
>('AnonymousConsentNormalizer');
