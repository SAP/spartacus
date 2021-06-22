import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
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
    <ng-container *ngIf="hasItem && unitKey$ | async as uid">
      <a
        *ngIf="context$ | async as context"
        [routerLink]="
          { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid, context) }
            | cxUrl
        "
      >
        {{ 'orgUser.roles' | cxTranslate }}
      </a>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserRolesCellComponent extends CellComponent {
  unitKey$: Observable<string> = this.itemService.key$;
  context$: Observable<TableDataOutletContext> = this.outlet.context$;

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: ItemService<B2BUnit>
  ) {
    super(outlet);
  }

  getRouterModel(uid: string, context: TableDataOutletContext): any {
    return { ...context, uid };
  }
}
