import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  selector: 'cx-date-range-cell',
  templateUrl: './date-range-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeCellComponent extends OrganizationCellComponent {
  get linkable(): boolean {
    return this.hasRange && (this.cellOptions.linkable ?? true);
  }

  get hasRange(): boolean {
    return !!this.model.startDate && !!this.model.endDate;
  }
}
