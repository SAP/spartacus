import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input()
  columns: Array<{ key: string; value: string; cxRoute?: string }>;

  @Input()
  tableData: Array<any>;
}
