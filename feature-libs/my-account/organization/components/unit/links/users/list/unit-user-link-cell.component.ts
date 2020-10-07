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
      [routerLink]="
        { cxRoute: 'unitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      <ul class="text">
        <li
          *ngFor="let role of roles"
          class="li"
          [innerText]="'organization.userRoles.' + role | cxTranslate"
        ></li>
        <li *ngIf="roles?.length === 0">-</li>
      </ul>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserRolesCellComponent extends OrganizationCellComponent {
  unitKey$ = this.itemService.key$;
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: OrganizationItemService<B2BUnit>
  ) {
    super(outlet);
  }

  get roles(): string[] {
    return (this.property as any) as string[];
  }

  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
