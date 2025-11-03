/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentPermissionService extends CurrentItemService<Permission> {
  protected routingService: RoutingService;
  protected permissionService = inject(PermissionService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const routingService = inject(RoutingService);

    super(routingService);
  
    this.routingService = routingService;
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
