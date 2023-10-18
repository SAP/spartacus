/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AsmCustomer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { Cart } from '@spartacus/cart/base/root';
import { UrlCommand, User } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { ReplaySubject, Subject } from 'rxjs';

import { AsmCustomer360SectionContext } from './asm-customer-360-section-context.model';

@Injectable()
export class AsmCustomer360SectionContextSource<
  Data
> extends AsmCustomer360SectionContext<Data> {
  readonly customer$ = new ReplaySubject<User>(1);

  readonly config$ = new ReplaySubject<AsmCustomer360SectionConfig>(1);

  readonly navigate$: Subject<UrlCommand> = new Subject();

  readonly data$ = new ReplaySubject<Data>(1);

  readonly savedCarts$ = new ReplaySubject<Array<Cart>>(1);

  readonly activeCart$ = new ReplaySubject<Cart>(1);

  readonly orderHistory$ = new ReplaySubject<OrderHistoryList>(1);
}
