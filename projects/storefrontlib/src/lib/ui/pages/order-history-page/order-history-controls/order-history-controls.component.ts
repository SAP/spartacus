import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'y-order-history-controls',
  templateUrl: './order-history-controls.component.html',
  styleUrls: ['./order-history-controls.component.scss']
})
export class OrderHistoryControlsComponent implements OnInit {
  @Input() numberOfPages: number;
  @Input() sort: string;
  currentPage: number;
  paginationBoundaries: number;
  pages: number[];
  constructor() {}

  ngOnInit() {
    this.pages = Array(this.numberOfPages)
      .fill(0)
      .map((x, i) => i + 1);

    this.currentPage = 1;
    this.paginationBoundaries = 1;
  }

  viewPage(pageNumber: number) {
    this.currentPage = pageNumber;

    if (pageNumber > this.pages.length - 2) {
      console.log('a');
      this.paginationBoundaries = pageNumber - 2;
    } else {
      console.log('b');
      this.paginationBoundaries = pageNumber;
    }

    console.log(this.paginationBoundaries);
  }

  prevPage() {
    if (this.currentPage !== 1) {
      this.currentPage -= 1;
    }
    if (this.paginationBoundaries !== 1) {
      this.paginationBoundaries -= 1;
    }
  }

  nextPage() {
    if (this.currentPage !== this.pages.length) {
      this.currentPage += 1;
    }

    if (this.paginationBoundaries !== this.pages.length) {
      this.paginationBoundaries += 1;
    }
  }
}
