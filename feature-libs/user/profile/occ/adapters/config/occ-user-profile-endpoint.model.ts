/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface UserProfileOccEndpoints {
  /**
   * Titles used for user's personal info.
   */
  titles?: string | CoreOccEndpoint;

  /**
   * Register a new user.
   */
  userRegister?: string | CoreOccEndpoint;

  /**
   * Request an email to reset the password
   */
  userForgotPassword?: string | CoreOccEndpoint;

  /**
   * Request an email to reset the password
   */
  userRestoreToken?: string | CoreOccEndpoint;

  /**
   * Reset the password once the email is received.
   */
  userResetPassword?: string | CoreOccEndpoint;

  /**
   * Update the user id with which the user authenticates.
   */
  userUpdateLoginId?: string | CoreOccEndpoint;

  /**
   * Update the user's password
   */
  userUpdatePassword?: string | CoreOccEndpoint;

  /**
   * Update the user's profile
   */
  userUpdateProfile?: string | CoreOccEndpoint;

  /**
   * Close user account
   */
  userCloseAccount?: string | CoreOccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserProfileOccEndpoints {}
}
