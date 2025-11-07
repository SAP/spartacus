/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
  standalone: false,
})
export class UserDetailsCellComponent extends CellComponent {
  protected b2bUserService = inject(B2BUserService);
  protected outlet: OutletContextData<TableDataOutletContext>;

  b2bUserModel: B2BUser;

  availableRoles: string[] = this.b2bUserService
    .getAllRoles()
    .map((role: B2BUserRole) => role.toString());
  availableRights: string[] = this.b2bUserService
    .getAllRights()
    .map((right: B2BUserRight) => right.toString());

  constructor() {
    const outlet = inject<OutletContextData<TableDataOutletContext>>(OutletContextData);

    super(outlet);
    this.outlet = outlet;

    this.b2bUserModel = super.model as B2BUser;
  }

  hasRight(model: B2BUser): boolean {
    return (model.roles ?? []).some((role: string) =>
      this.availableRights.includes(role)
    );
  }
}
