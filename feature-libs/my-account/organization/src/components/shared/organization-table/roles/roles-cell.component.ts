import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  template: `
    <a [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl">
      <span class="text">
        <span *ngFor="let role of model.roles" class="li">{{
          'organization.userRoles.' + role | cxTranslate
        }}</span>
      </span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesCellComponent extends OrganizationCellComponent {}
