import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { OrganizationCellComponent } from '../../../../shared/organization-table/organization-cell.component';

@Component({
  template: `
    <a
      *ngIf="unitKey$ | async as uid"
      [routerLink]="{ cxRoute: route, params: getRouterModel(uid) } | cxUrl"
      [tabIndex]="tabIndex"
    >
      <span class="text">{{ property }}</span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkCellComponent extends OrganizationCellComponent {
  unitKey$ = this.itemService.key$;
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: OrganizationItemService<B2BUnit>
  ) {
    super(outlet);
  }

  get tabIndex() {
    return 0;
  }

  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
