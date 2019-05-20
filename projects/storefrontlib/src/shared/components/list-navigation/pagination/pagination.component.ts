import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';

@Component({
  selector: 'cx-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  Array = Array;
  Math = Math;

  clickPageNo(page: number): number {
    if (
      page >= 1 &&
      page <= this.pagination.totalPages &&
      page !== this.pagination.currentPage + 1
    ) {
      this.pageChange(page);
      return page;
    }
    return this.pagination.currentPage;
  }

  pageChange(page: number): void {
    this.viewPageEvent.emit(page - 1);
  }
}
