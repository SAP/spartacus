/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaginationModel } from '@spartacus/core';

@Component({
  selector: 'cx-total',
  templateUrl: './total.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalComponent {
  private _pagination: PaginationModel;

  get pagination(): PaginationModel {
    return this._pagination;
  }
  @Input() set pagination(paginationModel: PaginationModel | undefined) {
    this._pagination = paginationModel ?? { totalResults: 0 };
  }

  /**
   * Current page, starting form page 0
   * */
  get currentPage(): number {
    return this.pagination?.currentPage ?? 0;
  }

  get pageSize(): number {
    return this.pagination?.pageSize ?? 0;
  }

  get totalResults(): number {
    return this.pagination?.totalResults ?? 0;
  }

  get fromItem() {
    return this.currentPage * this.pageSize + 1;
  }

  get toItem() {
    const lastItem = (this.currentPage + 1) * this.pageSize;
    return lastItem > this.totalResults ? this.totalResults : lastItem;
  }
}
