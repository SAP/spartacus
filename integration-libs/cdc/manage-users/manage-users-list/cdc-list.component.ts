/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseItem, ItemService, ListService } from '@spartacus/organization/administration/components';
import { ManageUsersService } from './manage-users.service';


@Component({
  selector: 'cx-org-list',
  templateUrl: './cdc-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdcListComponent<T extends BaseItem> extends ListComponent {
  constructor(
    protected service: ListService<T>,
    protected organizationItemService: ItemService<T>,
    protected manageUsersService: ManageUsersService
  ) {
    super(service, organizationItemService);
  }

  protected openDelegateAdmin() {
    this.manageUsersService.openDelegateAdminLogin();
  }
}
