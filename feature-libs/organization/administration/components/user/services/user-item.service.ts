/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserCreationNotifierService,
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
  // TODO(CXSPA-4439): make b2BUserCreationNotifierService a required dependency
  constructor(
    currentItemService: CurrentUserService,
    routingService: RoutingService,
    formService: UserFormService,
    userService: B2BUserService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    b2BUserCreationNotifierService?: B2BUserCreationNotifierService
  );
  /**
   * @deprecated since 6.5
   */
  constructor(
    currentItemService: CurrentUserService,
    routingService: RoutingService,
    formService: UserFormService,
    userService: B2BUserService
  );
  constructor(
    protected currentItemService: CurrentUserService,
    protected routingService: RoutingService,
    protected formService: UserFormService,
    protected userService: B2BUserService,
    @Optional()
    protected b2BUserCreationNotifierService?: B2BUserCreationNotifierService
  ) {
    super(currentItemService, routingService, formService);
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

    return (
      this.b2BUserCreationNotifierService?.b2bUserCreated$ ??
      this.userService.getLoadingStatus(value.uid ?? '')
    );
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
