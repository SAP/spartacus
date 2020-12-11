import { Component, Input } from '@angular/core';
import { PaginationModel } from '@spartacus/core';

@Component({
  selector: 'cx-store-finder-pagination-details',
  templateUrl: './store-finder-pagination-details.component.html',
})
export class StoreFinderPaginationDetailsComponent {
  @Input()
  pagination: PaginationModel;

  constructor() {}

  getResultsPerPage(): string {
    if (this.pagination.totalResults > this.pagination.pageSize) {
      const firstItem =
        this.pagination.currentPage * this.pagination.pageSize + 1;

      let resultsPerPage =
        (this.pagination.currentPage + 1) * this.pagination.pageSize;

      if (resultsPerPage > this.pagination.totalResults) {
        resultsPerPage = this.pagination.totalResults;
      }

      return `${firstItem} - ${resultsPerPage}`;
    } else {
      return `1 - ${this.pagination.totalResults}`;
    }
  }
}
