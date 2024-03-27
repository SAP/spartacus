/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit, useFeatureStyles } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CellComponent } from '../../../../shared/table/cell.component';

@Component({
  selector: 'cx-org-unit-user-link-cell',
  template: `
    <!--  TODO: (CXSPA-6457) - Remove feature flag next major release -->
    <ng-container *cxFeature="'a11yListOversizedFocus'">
      <a
        class="button"
        *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
        [routerLink]="
          { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
        "
      >
        {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
      </a>
    </ng-container>
    <ng-container *cxFeature="'!a11yListOversizedFocus'">
      <a
        *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
        [routerLink]="
          { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
        "
      >
        {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
      </a>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserRolesCellComponent extends CellComponent {
  unitKey$: Observable<string> = this.itemService.key$;
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: ItemService<B2BUnit>,
    protected b2bUserService: B2BUserService
  ) {
    super(outlet);
    useFeatureStyles('a11yListOversizedFocus');
  }
  isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
