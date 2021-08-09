import { OccEndpoint } from '@spartacus/core';

export interface UserProfileOccEndpoints {
  /**
   * Titles used for user's personal info.
   */
  titles?: string | OccEndpoint;

  /**
   * Register a new user.
   */
  userRegister?: string | OccEndpoint;

  /**
   * Request an email to reset the password
   */
  userForgotPassword?: string | OccEndpoint;

  /**
   * Reset the password once the email is received.
   */
  userResetPassword?: string | OccEndpoint;

  /**
   * Update the user id with which the user authenticates.
   */
  userUpdateLoginId?: string | OccEndpoint;

  /**
   * Update the user's password
   */
  userUpdatePassword?: string | OccEndpoint;

  /**
   * Update the user's profile
   */
  userUpdateProfile?: string | OccEndpoint;

  /**
   * Close user account
   */
  userCloseAccount?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserProfileOccEndpoints {}
}
