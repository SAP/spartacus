import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Table } from './table.model';

/**
 * Configurable Table component.
 *
 * The table component is introduced for the my-account/company
 * feature, but is fairy generic. The table is fully data driven and
 * does not come with a lot of features.
 * The main feature is related to the table columns:
 * - localized table headers, using the `I18nModule`.
 * - sorting of the table
 *
 * The table cells are rendered with an outlet, so that each cell can be configured
 * outside the component. This allows for flexibility inside the Spartacus libraries
 * as well for customers.
 */
@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() dataset: Table;

  @Output() sortEvent: EventEmitter<string> = new EventEmitter();

  sort(sortCode: string) {
    if (sortCode) {
      this.sortEvent.emit(sortCode);
    }
  }
}
