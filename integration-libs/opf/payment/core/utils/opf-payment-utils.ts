/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentBrowserInfo } from '@spartacus/opf/payment/root';

export function getBrowserInfo(
  nativeWindow: Window | undefined
): PaymentBrowserInfo {
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
