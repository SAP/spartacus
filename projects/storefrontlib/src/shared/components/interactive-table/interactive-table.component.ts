import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingModel } from '../../../cms-components/organization/abstract-component/abstract-listing.component';
import { Column } from '../table/table.component';

@Component({
  selector: 'cx-interactive-table',
  templateUrl: './interactive-table.component.html',
})
export class InteractiveTableComponent {
  @Input()
  header: string;

  @Input()
  createLabel: string;

  @Input()
  sortLabels: { [key: string]: string };

  @Input()
  columns: Array<Column>;

  @Input()
  data$: Observable<ListingModel>;

  @Output()
  pageChange = new EventEmitter<any>();

  @Output()
  changeSortCode = new EventEmitter<any>();

  @Output()
  check = new EventEmitter<any>();

  @Output()
  uncheck = new EventEmitter<any>();

  viewPageEvent(event) {
    this.pageChange.emit(event);
  }

  sortListEvent(event) {
    this.changeSortCode.emit(event);
  }

  checkEvent(event) {
    this.check.emit(event);
  }

  uncheckEvent(event) {
    this.uncheck.emit(event);
  }
}
