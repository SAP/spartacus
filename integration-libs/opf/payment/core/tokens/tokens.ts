/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentSubmitCompleteResponse,
  OpfPaymentSubmitResponse,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';

export const OPF_PAYMENT_VERIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, OpfPaymentVerificationResponse>
>('OpfPaymentVerificationNormalizer');

export const OPF_PAYMENT_SUBMIT_NORMALIZER = new InjectionToken<
  Converter<any, OpfPaymentSubmitResponse>
>('OpfPaymentSubmitNormalizer');

export const OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER = new InjectionToken<
  Converter<any, OpfPaymentSubmitCompleteResponse>
>('OpfPaymentSubmitCompleteNormalizer');

export const OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER = new InjectionToken<
  Converter<any, OpfPaymentAfterRedirectScriptResponse>
>('OpfAfterRedirectScriptsNormalizer');
