/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserGroupService extends CurrentItemService<UserGroup> {
  protected routingService: RoutingService;
  protected userGroupService = inject(UserGroupService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const routingService = inject(RoutingService);

    super(routingService);
  
    this.routingService = routingService;
  }

  protected getParamKey() {
    return ROUTE_PARAMS.userGroupCode;
  }

  protected getItem(code: string): Observable<UserGroup> {
    return this.userGroupService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.userGroupService.getErrorState(code);
  }
}
