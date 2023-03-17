/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { Cart } from '@spartacus/cart/base/root';
import { UrlCommand, User } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { Observable, Observer } from 'rxjs';

@Injectable()
export abstract class Customer360SectionContext<Data> {
  readonly customer$: Observable<User>;

  readonly config$: Observable<Customer360SectionConfig>;

  readonly navigate$: Observer<UrlCommand>;

  readonly data$: Observable<Data>;

  readonly savedCarts$: Observable<Array<Cart>>;

  readonly activeCart$: Observable<Cart>;

  readonly orderHistory$: Observable<OrderHistoryList>;
}
