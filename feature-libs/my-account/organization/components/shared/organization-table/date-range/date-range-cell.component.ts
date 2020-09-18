import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: './date-range-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeCellComponent extends OrganizationCellComponent {}
