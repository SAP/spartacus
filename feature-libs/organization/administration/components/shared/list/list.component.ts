/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {
  EntitiesModel,
  PaginationModel,
  Translatable,
  useFeatureStyles,
} from '@spartacus/core';
import {
  ICON_TYPE,
  Table,
  TableStructure,
  TrapFocus,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemService } from '../item.service';
import { OrganizationTableType } from '../organization.model';
import { CreateButtonType, ListService } from './list.service';

@Component({
  selector: 'cx-org-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T = any, P = PaginationModel> {
  readonly trapFocus = TrapFocus;

  @HostBinding('class.ghost') hasGhostData = false;

  constructor(
    protected service: ListService<T, P>,
    protected organizationItemService: ItemService<T>
  ) {
    useFeatureStyles('a11yOrganizationListHeadingOrder');
  }

  @HostBinding('class')
  viewType: OrganizationTableType = this.service.viewType;

  domainType = this.service.domainType;

  sortCode: string | undefined;

  iconTypes = ICON_TYPE;

  createButtonAllTypes = CreateButtonType;

  createButtonType = this.service.getCreateButtonType();

  /**
   * The current key represents the current selected item from the dataset.
   * This key is used to load the item details as well as highlight the item in
   * a list of items.
   */
  readonly currentKey$ = this.organizationItemService.key$;

  readonly structure$: Observable<TableStructure> = this.service.getStructure();

  readonly listData$: Observable<EntitiesModel<T> | undefined> = this.service
    .getData()
    .pipe(
      tap((data) => {
        this.sortCode = data?.pagination?.sort;
        this.hasGhostData = this.service.hasGhostData(data);
      })
    );

  @Input() key = this.service.key();

  @Input() hideAddButton = false;

  /**
   * Returns the total number of items.
   */
  getListCount(dataTable: Table | EntitiesModel<T>): number | undefined {
    return dataTable.pagination?.totalResults;
  }

  /**
   * Browses to the given page number
   */
  browse(pagination: P | undefined, pageNumber: number) {
    if (pagination) {
      this.service.view(pagination, pageNumber);
    }
  }

  /**
   * Navigates to the detailed view of the selected list item.
   */
  launchItem(event: T): void {
    this.organizationItemService.launchDetails(event);
  }

  /**
   * Sorts the list.
   */
  sort(pagination: P | undefined): void {
    if (pagination) {
      this.service.sort({
        ...pagination,
        ...({ sort: this.sortCode } as PaginationModel),
      });
    }
  }

  /**
   * Function to call when 'Manage Users' button is clicked
   */
  onCreateButtonClick(): void {
    this.service.onCreateButtonClick();
  }

  /**
   * Returns the label for Create button
   */
  getCreateButtonLabel(): Translatable {
    return this.service.getCreateButtonLabel();
  }
}
