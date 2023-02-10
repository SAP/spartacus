/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  ASM_360_FEATURE,
  AsmCustomer360TabComponent,
  AsmCustomer360Response,
} from '@spartacus/asm/root';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: Asm360Facade,
      feature: ASM_360_FEATURE,
      methods: ['get360Data'],
    }),
})
export abstract class Asm360Facade {
  abstract get360Data(
    components: Array<AsmCustomer360TabComponent>
  ): Observable<AsmCustomer360Response | undefined>;
}
