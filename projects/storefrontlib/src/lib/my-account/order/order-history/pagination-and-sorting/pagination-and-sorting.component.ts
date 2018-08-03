import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'y-pagination-sorting',
  templateUrl: './pagination-and-sorting.component.html',
  styleUrls: ['./pagination-and-sorting.component.scss']
})
export class PaginationAndSortingComponent implements OnInit, OnChanges {
  @Input() pagination: any;
  @Input() sorts: any[];
  @Output() viewPageEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() sortEvent: EventEmitter<{}> = new EventEmitter<{}>();

  currentPage: number;
  paginationBoundaries: number;
  pages: number[];
  activeSort: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.currentPage = changes.pagination.currentValue.currentPage;
    this.calculatePaginationBoundaries(this.currentPage);
    this.activeSort = this.getActiveSort(this.sorts);
  }

  ngOnInit() {
    this.pages = Array(this.pagination.totalPages)
      .fill(0)
      .map((x, i) => i);

    this.currentPage = this.pagination.currentPage;
    this.paginationBoundaries = 1;
    this.activeSort = this.getActiveSort(this.sorts);
  }

  viewPage(pageNumber: number) {
    this.calculatePaginationBoundaries(pageNumber);

    this.viewPageEvent.emit({
      currentPage: pageNumber,
      sortCode: this.activeSort
    });
  }

  sort() {
    this.sortEvent.emit({
      sortCode: this.activeSort,
      currentPage: this.currentPage
    });
  }
  prevPage() {
    if (this.currentPage !== 0) {
      this.viewPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage !== this.pages[this.pages.length - 1]) {
      this.viewPage(this.currentPage + 1);
    }
  }

  private calculatePaginationBoundaries(pageNumber: number) {
    if (this.pages && this.pages.length > 3) {
      if (pageNumber === 0) {
        this.paginationBoundaries = 1;
      } else if (pageNumber === this.pages[this.pages.length - 1]) {
        this.paginationBoundaries = this.pages.length - 2;
      } else {
        this.paginationBoundaries = pageNumber;
      }
    }
  }

  private getActiveSort(sorts) {
    return sorts.find(sort => sort.selected).code;
  }
}
