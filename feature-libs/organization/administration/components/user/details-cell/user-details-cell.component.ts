/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PopoverDirective } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { UrlPipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    RouterLink,
    NgFor,
    PopoverDirective,
    TranslatePipe,
    UrlPipe,
    MockTranslatePipe,
  ],
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
