import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  template: `
    <a
      [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl"
      [tabindex]="tabIndex"
    >
      <ul class="text">
        <li
          *ngFor="let role of model.roles"
          class="li"
          [innerText]="'organization.userRoles.' + role | cxTranslate"
        ></li>
        <li *ngIf="model.roles?.length === 0">-</li>
      </ul>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesCellComponent extends OrganizationCellComponent {}
