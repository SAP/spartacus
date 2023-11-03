import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { APPLE_PAY_SESSION } from './apple-pay-session.token';

import { WINDOW_TOKEN, windowFactory } from '@spartacus/opf/base/core';
import { ApplePayButtonComponent } from './apple-pay-button/apple-pay-button.component';
import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayService } from './apple-pay.service';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

export function applePaySessionFactoryFn(
  platformId: any,
  window: Window
): typeof ApplePaySession | undefined {
  if (isPlatformBrowser(platformId)) {
    return window['ApplePaySession'];
  } else {
    return undefined;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ApplePayButtonComponent],
  providers: [
    ApplePayService,
    ApplePayObservableFactory,
    ApplePaySessionFactory,
    {
      provide: WINDOW_TOKEN,
      deps: [],
      useFactory: windowFactory,
    },
    {
      provide: APPLE_PAY_SESSION,
      deps: [PLATFORM_ID, WINDOW_TOKEN],
      useFactory: applePaySessionFactoryFn,
    },
  ],
  exports: [ApplePayButtonComponent],
})
export class ApplePayModule {}
