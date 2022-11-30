/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaptchaApiConfig } from './captcha-api-config';
import { Subject } from 'rxjs';

export const defaultCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'https://www.google.com/recaptcha/api.js',
  fields: { 'data-theme': 'light', 'data-size': 'normal' },
  renderingFunction: (params) => {
    const retVal = new Subject<string>();

    // @ts-ignore Global object created when captcha script is loaded
    grecaptcha.render(params['element'], {
      sitekey: params['sitekey'],
      callback: (response: string) => {
        retVal.next(response);
        retVal.complete();
      },
    });

    return retVal.asObservable();
  },
};
