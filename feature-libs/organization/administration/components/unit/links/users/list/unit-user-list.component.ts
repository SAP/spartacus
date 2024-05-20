/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../../shared/list/list.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitUserListService } from '../services/unit-user-list.service';
import { B2BUserService } from '@spartacus/organization/administration/core';

@Component({
  selector: 'cx-org-unit-user-list',
  templateUrl: './unit-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UnitUserListService,
    },
  ],
})
export class UnitUserListComponent {
  routerKey = ROUTE_PARAMS.userCode;

  unit$: Observable<B2BUnit | undefined> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();

  constructor(
    protected currentUnitService: CurrentUnitService,
    protected b2bUserService: B2BUserService
  ) {}
}
