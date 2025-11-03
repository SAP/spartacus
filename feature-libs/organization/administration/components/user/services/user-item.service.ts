/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UserFormService } from '../form/user-form.service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserItemService extends ItemService<B2BUser> {
  protected currentItemService: CurrentUserService;
  protected routingService: RoutingService;
  protected formService: UserFormService;
  protected userService = inject(B2BUserService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const currentItemService = inject(CurrentUserService);
    const routingService = inject(RoutingService);
    const formService = inject(UserFormService);

    super(currentItemService, routingService, formService);
  
    this.currentItemService = currentItemService;
    this.routingService = routingService;
    this.formService = formService;
  }

  load(code: string): Observable<B2BUser> {
    this.userService.load(code);
    return this.userService.get(code);
  }

  update(
    code: string,
    value: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    delete value.approvers;
    this.userService.update(code, value);
    return this.userService.getLoadingStatus(code);
  }

  protected create(
    value: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userService.create(value);
    return this.userService.getLoadingStatus(value.uid ?? '');
  }

  protected getDetailsRoute(): string {
    return 'orgUserDetails';
  }

  // @override to avoid errors while creation
  launchDetails(item: B2BUser): void {
    if (item.customerId !== null) {
      super.launchDetails(item);
    }
  }
}
