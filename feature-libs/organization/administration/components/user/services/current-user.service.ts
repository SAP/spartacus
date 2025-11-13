/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends CurrentItemService<B2BUser> {
  protected routingService: RoutingService;
  protected b2bUserService = inject(B2BUserService);

  readonly name$: Observable<string | undefined> = this.item$.pipe(
    map((user: B2BUser | undefined) => user?.name)
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const routingService = inject(RoutingService);

    super(routingService);
  
    this.routingService = routingService;
  }

  protected getParamKey() {
    return ROUTE_PARAMS.userCode;
  }

  protected getItem(code: string): Observable<B2BUser> {
    return this.b2bUserService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.b2bUserService.getErrorState(code);
  }
}
