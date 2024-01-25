/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import { PickupOption } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PickupOptionFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: [
        'setPageContext',
        'getPageContext',
        'setPickupOption',
        'getPickupOption',
      ],
      async: true,
    }),
})
export abstract class PickupOptionFacade {
  abstract setPageContext(pageContext: string): void;
  abstract getPageContext(): Observable<string>;
  abstract setPickupOption(
    entryNumber: number,
    pickupOption: PickupOption
  ): void;
  abstract getPickupOption(
    entryNumber: number
  ): Observable<PickupOption | undefined>;
}
