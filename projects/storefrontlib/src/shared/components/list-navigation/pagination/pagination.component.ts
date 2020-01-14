import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { PaginationBuilder } from './pagination.builder';
import { PaginationItem } from './pagination.model';

// const PAGE_WINDOW_SIZE = 3;

@Component({
  selector: 'cx-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  // @Input() hideOnSinglePage = false;

  @Input() pageRoute = [];
  // @Input() routerLink: string[];
  @Input() pageParam;

  private _pagination: PaginationModel;
  get pagination(): PaginationModel {
    return this._pagination;
  }
  @Input() set pagination(value: PaginationModel) {
    this._pagination = value;
    this.render(value);
  }

  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  pages: PaginationItem[] = [];
  constructor(private paginationBuilder: PaginationBuilder) {}

  private render(pagination: PaginationModel) {
    this.pages = this.paginationBuilder.paginate(
      pagination.currentPage + 1,
      pagination.totalPages
    );
  }

  private get current(): number {
    return this.pagination.currentPage;
  }

  get previous(): number {
    return this.current - 1;
  }

  get next(): number {
    return this.current + 1;
  }

  get last(): number {
    return this.pagination.totalPages - 1;
  }

  isCurrent(pageNumber): boolean {
    return pageNumber === this.current;
  }
  /**
   *
   */
  isDisabled(pageNumber): boolean {
    return pageNumber === this.current || pageNumber > this.last;
  }

  isFirst(): boolean {
    return this.current === 0;
  }

  isLast(): boolean {
    return this.current === this.last;
  }

  getRouteParam(pageNumber: number) {
    const param = {};
    if (
      this.pageParam &&
      pageNumber <= this.last &&
      pageNumber !== this.current
    ) {
      param[this.pageParam] = pageNumber;
    }
    return param;
  }

  // Because pagination model uses indexes starting from 0,
  // add 1 to get current page number
  // private getCurrentPageNumber() {
  //   return this.pagination.currentPage + 1;
  // }

  // getPageIndicies(): Array<number> {
  //   return Array(this.pagination.totalPages);
  // }

  // Gets the minimum index of page numbers that can be shown by being within the page window range
  // getPageWindowMinIndex(): number {
  //   return (
  //     Math.floor(this.pagination.currentPage / PAGE_WINDOW_SIZE) *
  //     PAGE_WINDOW_SIZE
  //   );
  // }

  // Gets the maximum index of page numbers that can be shown by being within the page window range
  // getPageWindowMaxIndex(): number {
  //   return (
  //     Math.floor(this.pagination.currentPage / PAGE_WINDOW_SIZE) *
  //       PAGE_WINDOW_SIZE +
  //     2
  //   );
  // }

  // hasPages(): boolean {
  //   return this.pagination.totalPages > 0;
  // }

  // onPageIndex(index: number): boolean {
  //   return this.pagination.currentPage === index;
  // }

  // hidePageIndex(index: number): boolean {
  //   return (
  //     (this.getPageWindowMinIndex() > index ||
  //       this.getPageWindowMaxIndex() < index) &&
  //     (index > 0 && index < this.pagination.totalPages - 1)
  //   );
  // }

  // /**
  //  * Indicates whether the page number should appear in dots
  //  */
  // showDots(index: number): boolean {
  //   // if (index === 3) {
  //   //   console.log(
  //   //     'dots',
  //   //     this.hidePageIndex(index),
  //   //     this.getPageWindowMaxIndex(),
  //   //     this.getPageWindowMinIndex()
  //   //   );
  //   // }
  //   return (
  //     this.hidePageIndex(index) &&
  //     (index === this.getPageWindowMaxIndex() + 1 ||
  //       index === this.getPageWindowMinIndex() - 1)
  //   );
  // }

  // clickPageNo(page: number): number {
  //   // Change page on valid index
  //   if (
  //     page >= PAGE_FIRST &&
  //     page <= this.pagination.totalPages &&
  //     page !== this.getCurrentPageNumber()
  //   ) {
  //     this.pageChange(page);
  //     return page;
  //   }

  //   // Page stays the same on invalid index
  //   return this.pagination.currentPage;
  // }

  // pageChange(page: number): void {
  //   this.viewPageEvent.emit(page - 1);
  // }

  // showPagination() {
  //   return !(this.hideOnSinglePage && this.pagination.totalPages <= 1);
  // }
}
