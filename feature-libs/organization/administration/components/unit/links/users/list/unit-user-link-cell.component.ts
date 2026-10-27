/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { B2BUnit, TranslatePipe, UrlPipe } from '@spartacus/core';
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
    @if (isUpdatingUserAllowed && hasItem && (unitKey$ | async); as uid) {
      <a
        class="button"
        [routerLink]="
          { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
        "
      >
        {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
      </a>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe, TranslatePipe, UrlPipe],
})
export class UnitUserRolesCellComponent extends CellComponent {
  protected override outlet =
    inject<OutletContextData<TableDataOutletContext>>(OutletContextData);
  protected itemService = inject<ItemService<B2BUnit>>(ItemService);
  protected b2bUserService = inject(B2BUserService);

  unitKey$: Observable<string> = this.itemService.key$;
  isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
