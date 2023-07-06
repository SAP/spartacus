/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { CaptchaConfig } from '@spartacus/core';

export interface RenderParams {
  element?: HTMLElement | string;
  publicKey?: string;
}

export interface CaptchaProvider {
  /**
   * Renders captcha widget
   *
   * @params parameters required by a provider
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
