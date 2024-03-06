/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { MiniCartComponentService } from '@spartacus/cart/base/components/mini-cart';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  AuthService,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfMiniCartComponentService extends MiniCartComponentService {
  protected isUpdateBlocked = false;

  // Block Mini Cart UI so Active Cart can be switched without being noticed by user.
  // It is required while paying with OPF QuickBuy on PDP, Mini Cart must keep original values.

  blockUpdate(decision: boolean) {
    this.isUpdateBlocked = decision;
  }
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected authService: AuthService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService,
    protected eventService: EventService
  ) {
    super(
      activeCartFacade,
      authService,
      statePersistenceService,
      siteContextParamsService,
      eventService
    );
  }

  getQuantity(): Observable<number> {
    return super.getQuantity().pipe(filter(() => !this.isUpdateBlocked));
  }

  getTotalPrice(): Observable<string> {
    return super.getTotalPrice().pipe(filter(() => !this.isUpdateBlocked));
  }
}
