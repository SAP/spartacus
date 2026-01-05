/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { PunchoutRequisition, PunchoutSession } from '@spartacus/punchout/root';

export const PUNCHOUT_SESSION_NORMALIZER = new InjectionToken<
  Converter<any, PunchoutSession>
>('PunchoutSessionNormalizer');

export const PUNCHOUT_REQUISITION_NORMALIZER = new InjectionToken<
  Converter<any, PunchoutRequisition>
>('PunchoutRequisitionNormalizer');
