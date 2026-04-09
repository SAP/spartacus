/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { ChineseCity, ChineseDistrict, Title } from '../model/user-profile.model';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserProfileFacade,
      feature: USER_PROFILE_CORE_FEATURE,
      methods: ['get', 'update', 'close', 'getTitles', 'getCities', 'getDistricts'],
    }),
})
export abstract class UserProfileFacade {
  abstract get(): Observable<User | undefined>;

  abstract update(details: User): Observable<unknown>;

  abstract close(): Observable<unknown>;

  abstract getTitles(): Observable<Title[]>;

  abstract getCities(regionIsocode: string): Observable<ChineseCity[]>;

  abstract getDistricts(cityIsocode: string): Observable<ChineseDistrict[]>;
}
