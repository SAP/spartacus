/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import {
  AbstractOrderContext,
  AbstractOrderType,
} from '@spartacus/cart/base/root';
import { ReplaySubject } from 'rxjs';

/**
 * Context source for `AbstractOrderContext`.
 *
 * `AbstractOrderContext` should be injected instead in child components.
 */
@Injectable()
export class AbstractOrderContextSource implements AbstractOrderContext {
  readonly type$ = new ReplaySubject<AbstractOrderType>(1);
  readonly id$ = new ReplaySubject<string>(1);
}
