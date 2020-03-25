import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface Column {
  key: string;
  value: string;
  cxRoute?: string;
  checkBox?: boolean;
}

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input()
  columns: Array<Column>;

  @Input()
  tableData: Array<any>;

  @Output() check = new EventEmitter<{ key: string; row: any }>();
  @Output() uncheck = new EventEmitter<{ key: string; row: any }>();

  onToggle(event, row, key) {
    if (event.target.checked) {
      this.check.emit({ key, row });
    } else {
      this.uncheck.emit({ key, row });
    }
  }
}
