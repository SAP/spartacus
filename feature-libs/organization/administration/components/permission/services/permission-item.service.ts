/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { PermissionFormService } from '../form/permission-form.service';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionItemService extends ItemService<Permission> {
  protected override currentItemService = inject(CurrentPermissionService);
  protected override routingService = inject(RoutingService);
  protected override formService = inject(PermissionFormService);
  protected permissionService = inject(PermissionService);

  load(code: string): Observable<Permission> {
    this.permissionService.loadPermission(code);
    return this.permissionService.get(code);
  }

  update(
    code: string,
    value: Permission
  ): Observable<OrganizationItemStatus<Permission>> {
    this.permissionService.update(code, value);
    return this.permissionService.getLoadingStatus(value.code ?? '');
  }

  protected create(
    value: Permission
  ): Observable<OrganizationItemStatus<Permission>> {
    this.permissionService.create(value);
    return this.permissionService.getLoadingStatus(value.code ?? '');
  }

  protected getDetailsRoute(): string {
    return 'orgPurchaseLimitDetails';
  }
}
