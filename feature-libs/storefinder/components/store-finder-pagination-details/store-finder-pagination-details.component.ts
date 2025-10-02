/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-store-finder-pagination-details',
    templateUrl: './store-finder-pagination-details.component.html',
    imports: [TranslatePipe, MockTranslatePipe],
})
export class StoreFinderPaginationDetailsComponent {
  @Input()
  pagination: PaginationModel;

  constructor() {
    // Intentional empty constructor
  }

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
