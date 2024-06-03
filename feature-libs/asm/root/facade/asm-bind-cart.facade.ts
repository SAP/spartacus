/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';

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
   * Bind an anonymous cart to the current registered user
   */
  abstract bindCart(cartId: string): Observable<unknown>;
}
