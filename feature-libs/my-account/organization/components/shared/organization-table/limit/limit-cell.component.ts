import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  template: `
    <a
      [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl"
      [tabindex]="tabIndex"
    >
      <span class="text" *ngIf="model.threshold; else type"
        >{{ model.threshold }} {{ model.currency?.symbol }}
        {{ 'permission.per.' + model.periodRange | cxTranslate }}
      </span>
      <ng-template #type>
        <span class="text">{{ model.orderApprovalPermissionType.name }}</span>
      </ng-template>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitCellComponent extends OrganizationCellComponent {}
