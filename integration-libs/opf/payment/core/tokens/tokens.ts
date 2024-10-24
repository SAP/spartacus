/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  AfterRedirectScriptResponse,
  OpfPaymentVerificationResponse,
  SubmitCompleteResponse,
  SubmitResponse,
} from '@spartacus/opf/payment/root';

export const OPF_PAYMENT_VERIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, OpfPaymentVerificationResponse>
>('OpfPaymentVerificationNormalizer');

export const OPF_PAYMENT_SUBMIT_NORMALIZER = new InjectionToken<
  Converter<any, SubmitResponse>
>('OpfPaymentSubmitNormalizer');

export const OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER = new InjectionToken<
  Converter<any, SubmitCompleteResponse>
>('OpfPaymentSubmitCompleteNormalizer');

export const OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER = new InjectionToken<
  Converter<any, AfterRedirectScriptResponse>
>('OpfAfterRedirectScriptsNormalizer');
