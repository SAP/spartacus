import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ICON_TYPE } from './../../../cms-components/misc/icon/icon.model';

export interface Column {
  key: string;
  value: string;
  cxRoute?: string;
  checkBox?: boolean;
  button?: boolean;
}

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  iconTypes = ICON_TYPE;

  @Input()
  columns: Array<Column>;

  @Input()
  tableData: Array<any>;

  @Output() check = new EventEmitter<{ key: string; row: any }>();

  @Output() uncheck = new EventEmitter<{ key: string; row: any }>();

  @Output() buttonClick = new EventEmitter<{ key: string; row: any }>();

  onToggle(event, row, key) {
    if (event.target.checked) {
      this.check.emit({ key, row });
    } else {
      this.uncheck.emit({ key, row });
    }
  }

  onClick(event, row, key) {
    if (event.target) {
      this.buttonClick.emit({ key, row });
    }
  }
}
