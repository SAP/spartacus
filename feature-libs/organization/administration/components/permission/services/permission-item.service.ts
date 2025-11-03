/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  protected currentItemService: CurrentPermissionService;
  protected routingService: RoutingService;
  protected formService: PermissionFormService;
  protected permissionService = inject(PermissionService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const currentItemService = inject(CurrentPermissionService);
    const routingService = inject(RoutingService);
    const formService = inject(PermissionFormService);

    super(currentItemService, routingService, formService);
  
    this.currentItemService = currentItemService;
    this.routingService = routingService;
    this.formService = formService;
  }

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
