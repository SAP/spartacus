import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';

@Component({
  selector: 'cx-organization-list',
  templateUrl: './organization-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationListComponent {
  @Input() type: string;

  @Input() dataTable: Table;

  @Input() activeRow;

  @Output() sortEvent = new EventEmitter();
  @Output() paginateEvent = new EventEmitter();

  viewPage(pagination: PaginationModel, page: number) {
    this.paginateEvent.emit({
      pagination,
      page,
    });
  }

  sort(pagination: PaginationModel, sort: string) {
    this.sortEvent.emit({
      pagination,
      sort,
    });
  }
}
