/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OAuthTryLoginResult {
  /**
   * Result returned by native `OAuthService.tryLogin()`.
   */
  result: boolean;

  /**
   * Indicated if the event 'token_received' was emitted during `OAuthService.tryLogin()`.
   * We can use this identify that we have returned from an external authorization page to Spartacus.
   * In cases where we don't receive this event, we can deduce that the token has been obtained from storage.
   */
  tokenReceived: boolean;
}
