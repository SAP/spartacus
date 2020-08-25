import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  template: `
    <a [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl">
      <span class="text">
        {{ model.startDate | cxDate }} - {{ model.endDate | cxDate }}
      </span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeCellComponent extends OrganizationCellComponent {}
