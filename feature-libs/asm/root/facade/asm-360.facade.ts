/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { AsmCustomer360Response } from '../model/customer-360.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: Asm360Facade,
      feature: ASM_FEATURE,
      methods: ['get360Data', 'get360DataState'],
    }),
})
export abstract class Asm360Facade {
  abstract get360Data(
    tabIndex: number
  ): Observable<AsmCustomer360Response | undefined> | undefined;
  abstract get360DataState(
    tabIndex: number
  ): Observable<QueryState<AsmCustomer360Response>> | undefined;
}
