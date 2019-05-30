import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';

const PAGE_FIRST = 1;
const PAGE_WINDOW_SIZE = 3;

@Component({
  selector: 'cx-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  // Because pagination model uses indexes starting from 0,
  // add 1 to get current page number
  private getCurrentPageNumber() {
    return this.pagination.currentPage + 1;
  }

  getPagePrevious(): number {
    return this.getCurrentPageNumber() - 1;
  }

  getPageNext(): number {
    return this.getCurrentPageNumber() + 1;
  }

  getPageIndicies(): Array<number> {
    return Array(this.pagination.totalPages);
  }

  // Gets the minimum index of page numbers that can be shown by being within the page window range
  getPageWindowMinIndex(): number {
    return (
      Math.floor(this.pagination.currentPage / PAGE_WINDOW_SIZE) *
      PAGE_WINDOW_SIZE
    );
  }

  // Gets the maximum index of page numbers that can be shown by being within the page window range
  getPageWindowMaxIndex(): number {
    return (
      Math.floor(this.pagination.currentPage / PAGE_WINDOW_SIZE) *
        PAGE_WINDOW_SIZE +
      2
    );
  }

  hasPages(): boolean {
    return this.pagination.totalPages > 0;
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

  hidePageIndex(index: number): boolean {
    return (
      (this.getPageWindowMinIndex() > index ||
        this.getPageWindowMaxIndex() < index) &&
      (index > 0 && index < this.pagination.totalPages - 1)
    );
  }

  showDots(index: number): boolean {
    return (
      this.hidePageIndex(index) &&
      (index === this.getPageWindowMaxIndex() + 1 ||
        index === this.getPageWindowMinIndex() - 1)
    );
  }

  clickPageNo(page: number): number {
    // Change page on valid index
    if (
      page >= PAGE_FIRST &&
      page <= this.pagination.totalPages &&
      page !== this.getCurrentPageNumber()
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
