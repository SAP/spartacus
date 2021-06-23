import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Titles used for user's personal info.
     *
     * @member {string}
     */
    titles?: string | OccEndpoint;

    /**
     * Register a new user.
     *
     * @member {string}
     */
    userRegister?: string | OccEndpoint;

    /**
     * Request an email to reset the password
     *
     * @member {string}
     */
    userForgotPassword?: string | OccEndpoint;

    /**
     * Reset the password once the email is received.
     *
     * @member {string}
     */
    userResetPassword?: string | OccEndpoint;

    /**
     * Update the user id with which the user authenticates.
     *
     * @member {string}
     */
    userUpdateLoginId?: string | OccEndpoint;

    /**
     * Update the user's password
     *
     * @member {string}
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
}
