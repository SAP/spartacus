/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';
import { UrlCommand, User } from '@spartacus/core';
import { ReplaySubject, Subject } from 'rxjs';

import { Customer360SectionContext } from './customer-360-section-context.model';

@Injectable()
export class Customer360SectionContextSource<
  Data
> extends Customer360SectionContext<Data> {
  readonly customer$ = new ReplaySubject<User>(1);

  readonly config$ = new ReplaySubject<Customer360SectionConfig>(1);

  readonly navigate$: Subject<UrlCommand> = new Subject();

  readonly data$ = new ReplaySubject<Data>(1);
}
