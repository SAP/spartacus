/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { B2BUserRole, B2BUserRight } from '@spartacus/core';
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
  availableRoles: B2BUserRole[] = this.b2bUserService.getAllRoles();
  availableRights: B2BUserRight[] = this.b2bUserService.getAllRights();

  constructor(
    protected b2bUserService: B2BUserService,
    protected outlet: OutletContextData<TableDataOutletContext>
  ) {
    super(outlet);
  }
}
