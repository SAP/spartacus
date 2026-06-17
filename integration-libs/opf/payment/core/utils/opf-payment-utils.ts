/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfPaymentBrowserInfo } from '@spartacus/opf/payment/root';

export function getBrowserInfo(
  nativeWindow: Window | undefined
): OpfPaymentBrowserInfo {
  return {
    acceptHeader: 'application/json',
    colorDepth: nativeWindow?.screen?.colorDepth,
    javaEnabled: false,
    javaScriptEnabled: true,
    language: nativeWindow?.navigator?.language,
    screenHeight: nativeWindow?.screen?.height,
    screenWidth: nativeWindow?.screen?.width,
    userAgent: nativeWindow?.navigator?.userAgent,
    originUrl: nativeWindow?.location?.origin,
    timeZoneOffset: new Date().getTimezoneOffset(),
  };
}

/**
 * Google Pay Quick Buy encodes `paymentMethodData.tokenizationData.token` for OPF submit.
 */
export function encodeOpfGooglePayEncryptedToken(
  tokenizationDataToken: string
): string {
  return btoa(tokenizationDataToken);
}
