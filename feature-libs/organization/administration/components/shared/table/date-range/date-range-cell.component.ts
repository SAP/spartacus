import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-date-range-cell',
  templateUrl: './date-range-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeCellComponent extends CellComponent {
  get linkable(): boolean {
    return this.hasRange && (this.cellOptions.linkable ?? true);
  }

  get hasRange(): boolean {
    return !!this.model.startDate && !!this.model.endDate;
  }
}
