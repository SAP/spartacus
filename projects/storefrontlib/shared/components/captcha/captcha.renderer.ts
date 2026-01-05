/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { RenderParams } from './captcha.model';
import { CaptchaConfig } from '@spartacus/core';

export interface CaptchaRenderer {
  /**
   * Renders captcha widget
   *
   * @RenderParams parameters required by a provider, includes html element to append CAPTCHA UI element.
   * @returns Observable for the key returned by a provider once user validated
   */
  renderCaptcha(params: RenderParams): Observable<string>;

  /**
   * @returns Observable for the backend request to retrieve commerce cloud
   * captcha configuration (such as public key and whether captca is enabled)
   * */
  getCaptchaConfig(): Observable<CaptchaConfig>;

  /**
   * @returns captcha token
   */
  getToken(): string;
}
