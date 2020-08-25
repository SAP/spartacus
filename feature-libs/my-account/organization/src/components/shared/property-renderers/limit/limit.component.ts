import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PermissionModel } from '../../../permission/list/permission-list.service';
import { OrganizationLinkComponent } from '../organization-link.component';

@Component({
  template: `
    <a [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl">
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
export class LimitComponent extends OrganizationLinkComponent<
  PermissionModel
> {}
