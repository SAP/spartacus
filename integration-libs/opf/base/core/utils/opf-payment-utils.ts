import { PaymentBrowserInfo } from '@spartacus/opf/base/root';

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
