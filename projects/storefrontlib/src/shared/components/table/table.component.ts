import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  constructor() {
    this.sortListEvent = new EventEmitter<string>();
    this.pageChangeEvent = new EventEmitter<number>();
    this.clickDetailsEvent = new EventEmitter<any>();
  }

  @Input()
  pageSize = 5;

  @Input()
  columns: Array<{key: string, value: string}>;

  @Input()
  sortLabels: [];

  @Input()
  tableData$: Observable<any>;

  @Input()
  sortType$: BehaviorSubject<string>;

  @Input()
  currentPage$: BehaviorSubject<number>;

  @Input()
  isLoaded$: Observable<boolean>;

  @Input()
  cxRoute: string;

  @Input()
  header: string;

  @Output()
  sortListEvent: EventEmitter<string>;

  @Output()
  pageChangeEvent: EventEmitter<number>;

  @Output()
  clickDetailsEvent: EventEmitter<any>;

  changeSortCode(sortCode: string): void {
    this.sortListEvent.emit(sortCode);
  }

  pageChange(page: number): void {
    this.pageChangeEvent.emit(page);
  }

  goToDetail(params: any): void {
    this.clickDetailsEvent.emit(params);
  }
}
