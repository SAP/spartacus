/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  User,
  VerificationToken,
  VerificationTokenCreation,
} from '@spartacus/user/account/root';
import { Observable } from 'rxjs';

export abstract class UserAccountAdapter {
  abstract load(userId: string): Observable<User>;

  abstract createVerificationToken(
    verificationTokenCreation: VerificationTokenCreation
  ): Observable<VerificationToken>;
}
