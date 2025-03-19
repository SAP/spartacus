/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OpfCtaScriptsResponse } from '@spartacus/opf/cta/root';

export const OPF_CTA_SCRIPTS_NORMALIZER = new InjectionToken<
  Converter<any, OpfCtaScriptsResponse>
>('OpfCtaScriptsNormalizer');
