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

  getPagePrevious(): number {
    return this.pagination.currentPage;
  }

  getPageNext(): number {
    return this.pagination.currentPage + 2;
  }

  getPageIndicies(): Array<number> {
    return Array(this.pagination.totalPages);
  }

  getPageWindowBottom(): number {
    return (
      Math.floor(this.pagination.currentPage / PAGE_WINDOW_SIZE) *
      PAGE_WINDOW_SIZE
    );
  }

  getPageWindowTop(): number {
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
      (this.getPageWindowBottom() > index || this.getPageWindowTop() < index) &&
      (index > 0 && index < this.pagination.totalPages - 1)
    );
  }

  showDots(index: number): boolean {
    return (
      this.hidePageIndex(index) &&
      (index === this.getPageWindowTop() + 1 ||
        index === this.getPageWindowBottom() - 1)
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
