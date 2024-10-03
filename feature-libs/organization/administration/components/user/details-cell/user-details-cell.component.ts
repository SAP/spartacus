/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { B2BUser, B2BUserRole, B2BUserRight } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-org-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsCellComponent extends CellComponent {
  b2bUserModel: B2BUser;

  availableRoles: string[] = this.b2bUserService
    .getAllRoles()
    .map((role: B2BUserRole) => role.toString());
  availableRights: string[] = this.b2bUserService
    .getAllRights()
    .map((right: B2BUserRight) => right.toString());

  constructor(
    protected b2bUserService: B2BUserService,
    protected outlet: OutletContextData<TableDataOutletContext>
  ) {
    super(outlet);
    this.b2bUserModel = super.model as B2BUser;
  }

  hasRight(model: B2BUser): boolean {
    return (model.roles ?? []).some((role: string) =>
      this.availableRights.includes(role)
    );
  }
}
