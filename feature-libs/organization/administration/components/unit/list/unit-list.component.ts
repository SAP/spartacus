/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { ListComponent } from '../../shared/list/list.component';
import { UnitListService } from '../services/unit-list.service';
import { UnitTreeService } from '../services/unit-tree.service';

@Component({
  selector: 'cx-org-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListComponent, TranslatePipe, IconComponent],
  styles: [
    `
      :host .unit-search {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      :host .unit-search .search-input {
        padding-inline-end: 2rem;
      }
      :host .unit-search:not(.dirty) button.reset {
        display: none;
      }
      :host .unit-search button.reset {
        position: absolute;
        inset-inline-end: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        color: var(--cx-color-secondary);
      }
    `,
  ],
})
export class UnitListComponent {
  iconTypes = ICON_TYPE;

  searchInput = '';

  constructor(
    protected unitTreeService: UnitTreeService,
    protected unitListService: UnitListService,
    protected orgUnitService?: OrgUnitService
  ) {}

  readonly isUpdatingUnitAllowed = this.orgUnitService
    ? this.orgUnitService.isUpdatingUnitAllowed()
    : true;

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }

  /**
   * Handles search input changes and triggers filtering.
   * Automatically expands all nodes when searching.
   */
  onSearchChange(value: string): void {
    this.searchInput = value;
    this.unitListService.search(value);
    if (value.trim()) {
      this.unitTreeService.expandAll();
    }
  }

  /**
   * Clears the search input and resets the filter.
   */
  clearSearch(): void {
    this.searchInput = '';
    this.unitListService.clearSearch();
  }
}
