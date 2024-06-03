/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  User,
  VerificationToken,
  VerificationTokenCreation,
} from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { UserAccountAdapter } from './user-account.adapter';

@Injectable()
export class UserAccountConnector {
  constructor(protected adapter: UserAccountAdapter) {}

  get(userId: string): Observable<User> {
    return this.adapter.load(userId);
  }

  createVerificationToken(
    verificationTokenCreation: VerificationTokenCreation
  ): Observable<VerificationToken> {
    return this.adapter.createVerificationToken(verificationTokenCreation);
  }
}
