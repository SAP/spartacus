import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input()
  columns: Array<{
    key: string;
    value: string;
    cxRoute?: string;
    check?: string;
  }>;

  @Input()
  tableData: Array<any>;

  @Output() toggle = new EventEmitter<any>();

  onToggle(event, row) {
    this.toggle.emit({ value: event.target.value, row });
  }
}
