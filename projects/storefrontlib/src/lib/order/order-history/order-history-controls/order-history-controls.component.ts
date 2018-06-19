import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'y-order-history-controls',
  templateUrl: './order-history-controls.component.html',
  styleUrls: ['./order-history-controls.component.scss']
})
export class OrderHistoryControlsComponent implements OnInit {
  @Input() pagination: any;
  @Input() sort: any[];
  @Output() viewPageEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() sortOrderEvent: EventEmitter<{}> = new EventEmitter<{}>();

  currentPage: number;
  paginationBoundaries: number;
  pages: number[];
  activeSort: string;

  constructor() {}

  ngOnInit() {
    this.pages = Array(this.pagination.totalPages)
      .fill(0)
      .map((x, i) => i);

    this.currentPage = 0;
    this.paginationBoundaries = 1;
    this.activeSort = this.sort[0].code;
  }

  viewPage(pageNumber: number) {
    this.currentPage = pageNumber;

    if (this.pages.length > 3) {
      if (pageNumber === 0) {
        this.paginationBoundaries = 1;
      } else if (pageNumber === this.pages[this.pages.length - 1]) {
        this.paginationBoundaries = this.pages.length - 2;
      } else {
        this.paginationBoundaries = pageNumber;
      }
    }
    this.viewPageEvent.emit({
      currentPage: this.currentPage,
      sortCode: this.activeSort
    });
  }
  sortOrders() {
    this.sortOrderEvent.emit({
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
}
