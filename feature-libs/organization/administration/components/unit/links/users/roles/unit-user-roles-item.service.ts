/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitUserService } from '../services/current-unit-user.service';
import { UnitUserRolesFormService } from './unit-user-roles-form.service';
@Injectable({
  providedIn: 'root',
})
export class UnitUserRolesItemService extends ItemService<B2BUser> {
  protected currentItemService: CurrentUnitUserService;
  protected routingService: RoutingService;
  protected formService: UnitUserRolesFormService;
  protected unitService = inject(OrgUnitService);
  protected b2bUserService = inject(B2BUserService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const currentItemService = inject(CurrentUnitUserService);
    const routingService = inject(RoutingService);
    const formService = inject(UnitUserRolesFormService);

    super(currentItemService, routingService, formService);
  
    this.currentItemService = currentItemService;
    this.routingService = routingService;
    this.formService = formService;
  }

  save(
    form: UntypedFormGroup,
    key?: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    // we enable the unit so that the underlying
    // save method can read the complete form.value.
    form.get('orgUnit')?.enable();
    return super.save(form, key);
  }

  load(unitUid: string): Observable<B2BUser> {
    return this.b2bUserService.get(unitUid);
  }

  update(
    customerId: string,
    _user: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    return this.b2bUserService.getLoadingStatus(customerId);
  }

  protected create(
    _customer: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    return this.b2bUserService.getLoadingStatus('');
  }

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }
}
