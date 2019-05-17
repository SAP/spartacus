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

  pageChange(page: number): void {
    // Emit page change if page is valid
    if (
      page >= 0 &&
      page < this.pagination.totalPages &&
      page !== this.pagination.currentPage
    ) {
      this.viewPageEvent.emit(page);
    }
  }
}
