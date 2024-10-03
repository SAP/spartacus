/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import { AbstractOrderKey } from '@spartacus/cart/base/root';
import { ReplaySubject } from 'rxjs';
import { AbstractOrderContext } from './abstract-order-context.model';

/**
 * Context source for AbstractOrderContext. Default values represent the context
 * of an active cart
 *
 * AbstractOrderContext should be injected in child components.
 */
@Injectable()
export class AbstractOrderContextSource implements AbstractOrderContext {
  readonly key$ = new ReplaySubject<AbstractOrderKey>(1);
}
