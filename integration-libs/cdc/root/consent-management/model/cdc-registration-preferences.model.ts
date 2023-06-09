/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import { UserSignUp } from '@spartacus/user/profile/root';
declare module '@spartacus/user/profile/root' {
  interface UserSignUp {
    /**
     * contains cdc consents that needs to be set during registration of new user
     *
     * @member {any}
     */
    preferences?: any;
  }
}
