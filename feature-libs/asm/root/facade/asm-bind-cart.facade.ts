/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { BindCartParams } from '../model/index';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmBindCartFacade,
      feature: ASM_FEATURE,
      methods: ['bindCart'],
    }),
})
export abstract class AsmBindCartFacade {
  /**
   * Bind an anonymous cart to customer
   * @param options
   */
  abstract bindCart(options: BindCartParams): Observable<unknown>;
}
