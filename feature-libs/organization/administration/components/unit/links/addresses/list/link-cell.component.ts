/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CellComponent } from '../../../../shared/table/cell.component';

@Component({
  selector: 'cx-org-link-cell',
  template: `
    <ng-container *ngIf="unitKey$ | async as uid">
      <a
        *ngIf="linkable; else text"
        [routerLink]="{ cxRoute: route, params: getRouterModel(uid) } | cxUrl"
        [tabIndex]="tabIndex"
      >
        <ng-container *ngTemplateOutlet="text"></ng-container>
      </a>
    </ng-container>

    <ng-template #text>
      <span class="text" title="{{ property }}">{{ property }}</span>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LinkCellComponent extends CellComponent {
  protected outlet: OutletContextData<TableDataOutletContext>;
  protected itemService = inject<ItemService<B2BUnit>>(ItemService);

  unitKey$: Observable<string> = this.itemService.key$;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    const outlet = inject<OutletContextData<TableDataOutletContext>>(OutletContextData);

    super(outlet);
  
    this.outlet = outlet;
  }

  get tabIndex() {
    return 0;
  }

  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
