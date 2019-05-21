import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';

const PAGE_FIRST = 1;

@Component({
  selector: 'cx-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  getPageFirst(): number {
    return PAGE_FIRST;
  }

  getPageLast(): number {
    return this.pagination.totalPages;
  }

  getPagePrevious(): number {
    return this.pagination.currentPage;
  }

  getPageNext(): number {
    return this.pagination.currentPage + 2;
  }

  getPageIndicies(): Array<number> {
    return Array(this.pagination.totalPages);
  }

  onFirstPage(): boolean {
    return this.pagination.currentPage === 0;
  }

  onLastPage(): boolean {
    return this.pagination.currentPage === this.pagination.totalPages - 1;
  }

  onPageIndex(index: number): boolean {
    return this.pagination.currentPage === index;
  }

  hideContinuedBack(): boolean {
    return !(this.pagination.totalPages > 2 && this.hidePageIndex(1));
  }

  hideContinuedForwards(): boolean {
    return !(
      this.pagination.totalPages > 2 &&
      this.hidePageIndex(this.pagination.totalPages - 2)
    );
  }

  hidePageIndex(index: number): boolean {
    return (
      index === 0 ||
      index === this.pagination.totalPages - 1 ||
      Math.floor(this.pagination.currentPage / 3) * 3 > index ||
      Math.floor(this.pagination.currentPage / 3) * 3 + 2 < index
    );
  }

  clickPageNo(page: number): number {
    // Change page on valid index
    if (
      page >= PAGE_FIRST &&
      page <= this.pagination.totalPages &&
      page !== this.pagination.currentPage + 1
    ) {
      this.pageChange(page);
      return page;
    }

    // Page stays the same on invalid index
    return this.pagination.currentPage;
  }

  pageChange(page: number): void {
    this.viewPageEvent.emit(page - 1);
  }
}
