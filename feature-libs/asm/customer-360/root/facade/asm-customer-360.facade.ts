/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_CUSTOMER_360_FEATURE } from '../feature-name';
import { AsmCustomer360Response, AsmCustomer360TabComponent } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmCustomer360Facade,
      feature: ASM_CUSTOMER_360_FEATURE,
      methods: ['get360Data'],
    }),
})
export abstract class AsmCustomer360Facade {
  abstract get360Data(
    components: Array<AsmCustomer360TabComponent>
  ): Observable<AsmCustomer360Response | undefined>;
}
