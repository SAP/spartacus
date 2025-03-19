/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ApplePaySessionVerificationResponse } from '@spartacus/opf/quick-buy/root';

export const OPF_APPLE_PAY_WEB_SESSION_NORMALIZER = new InjectionToken<
  Converter<any, ApplePaySessionVerificationResponse>
>('OpfApplePayWebSession');
