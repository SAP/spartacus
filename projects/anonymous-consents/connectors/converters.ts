/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {InjectionToken} from '@angular/core';
import {AnonymousConsent, Converter} from "@spartacus/core";

export const ANONYMOUS_CONSENT_NORMALIZER = new InjectionToken<
  Converter<string, AnonymousConsent[]>
>('AnonymousConsentNormalizer');
