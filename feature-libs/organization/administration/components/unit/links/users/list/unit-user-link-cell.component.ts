/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CellComponent } from '../../../../shared/table/cell.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-org-unit-user-link-cell',
  template: `
    <a
      class="button"
      *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
    MockTranslatePipe,
  ],
})
export class UnitUserRolesCellComponent extends CellComponent {
  unitKey$: Observable<string> = this.itemService.key$;
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: ItemService<B2BUnit>,
    protected b2bUserService: B2BUserService
  ) {
    super(outlet);
  }
  isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
