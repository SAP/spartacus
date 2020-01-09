import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  constructor() {
    this.clickDetailsEvent = new EventEmitter<any>();
  }

  @Input()
  pageSize = 5;

  @Input()
  columns: Array<{ key: string; value: string }>;

  @Input()
  tableData: Array<any>;

  @Input()
  cxRoute: string;

  @Output()
  clickDetailsEvent: EventEmitter<any>;

  goToDetail(params: any): void {
    this.clickDetailsEvent.emit(params);
  }
}
