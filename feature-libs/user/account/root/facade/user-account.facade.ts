/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_ACCOUNT_CORE_FEATURE } from '../feature-name';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserAccountFacade,
      feature: USER_ACCOUNT_CORE_FEATURE,
      methods: ['get', 'getById'],
    }),
})
export abstract class UserAccountFacade {
  abstract get(): Observable<User | undefined>;
  abstract getById(userId: string): Observable<User | undefined>;
}
