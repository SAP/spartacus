/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CUSTOMER_360_FEATURE } from '../feature-name';
import { Customer360Response, Customer360TabComponent } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: Customer360Facade,
      feature: CUSTOMER_360_FEATURE,
      methods: ['get360Data'],
    }),
})
export abstract class Customer360Facade {
  abstract get360Data(
    components: Array<Customer360TabComponent>
  ): Observable<Customer360Response | undefined>;
}
