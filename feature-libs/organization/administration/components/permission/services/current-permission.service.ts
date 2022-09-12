/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { RoutingService } from '@commerce-storefront-toolset/core';
import {
  Permission,
  PermissionService,
} from '@commerce-storefront-toolset/organization/administration/core';
import { ROUTE_PARAMS } from '@commerce-storefront-toolset/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentPermissionService extends CurrentItemService<Permission> {
  constructor(
    protected routingService: RoutingService,
    protected permissionService: PermissionService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.permissionCode;
  }

  protected getItem(code: string): Observable<Permission> {
    return this.permissionService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.permissionService.getErrorState(code);
  }
}
