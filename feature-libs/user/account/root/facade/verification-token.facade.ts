/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_ACCOUNT_CORE_FEATURE } from '../feature-name';
import { VerificationToken, VerificationTokenCreation } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: VerificationTokenFacade,
      feature: USER_ACCOUNT_CORE_FEATURE,
      methods: ['createVerificationToken'],
    }),
})
export abstract class VerificationTokenFacade {
  abstract createVerificationToken(
    verificationTokenCreation: VerificationTokenCreation
  ): Observable<VerificationToken>;
}
