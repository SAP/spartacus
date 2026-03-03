/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import {
  EntitiesModel,
  PaginationModel,
  Translatable,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  PaginationComponent,
  PopoverDirective,
  SplitViewComponent,
  Table,
  TableComponent,
  TableStructure,
  TrapFocus,
  ViewComponent,
} from '@spartacus/storefront';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ItemService } from '../item.service';
import { OrganizationTableType } from '../organization.model';
import { CreateButtonType, ListService } from './list.service';

@Component({
  selector: 'cx-org-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SplitViewComponent,
    NgIf,
    ViewComponent,
    PopoverDirective,
    IconComponent,
    NgSelectComponent,
    FormsModule,
    NgFor,
    NgOptionComponent,
    RouterLinkActive,
    RouterLink,
    TableComponent,
    PaginationComponent,
    RouterOutlet,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class ListComponent<T = any, P = PaginationModel>
  implements OnInit, OnDestroy
{
  private searchSubject$ = new Subject<{ pagination: P; query: string }>();

  private destroy$ = new Subject<void>();

  minSearchCharacters = this.service.getMinSearchCharacters();

  ngOnInit(): void {
    this.searchSubject$
      .pipe(
        debounceTime(300),
        filter(
          ({ query }) =>
            query.length >= this.minSearchCharacters || query.length === 0
        ),
        distinctUntilChanged((prev, curr) => prev.query === curr.query),
        takeUntil(this.destroy$)
      )
      .subscribe(({ pagination, query }) => {
        this.service.search(pagination, query);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly trapFocus = TrapFocus;

  hasGhostData = false;

  constructor(
    protected service: ListService<T, P>,
    protected organizationItemService: ItemService<T>
  ) {}

  @HostBinding('class')
  viewType: OrganizationTableType = this.service.viewType;

  domainType = this.service.domainType;

  sortCode: string | undefined;

  iconTypes = ICON_TYPE;

  createButtonAllTypes = CreateButtonType;

  createButtonType = this.service.getCreateButtonType();

  /**
   * Current search query value.
   */
  searchQuery = '';

  /**
   * Whether search is enabled for this list.
   */
  isSearchEnabled = this.service.isSearchEnabled();

  onSearchQueryChange(pagination: P | undefined, query: string): void {
    if (pagination && this.isSearchEnabled) {
      this.searchSubject$.next({ pagination, query });
    }
  }

  /**
   * The current key represents the current selected item from the dataset.
   * This key is used to load the item details as well as highlight the item in
   * a list of items.
   */
  readonly currentKey$ = this.organizationItemService.key$;

  readonly structure$: Observable<TableStructure> = this.service.getStructure();

  /**
   * Cached values from the last successful data load.
   * Used to display semi-transparent table during loading.
   */
  cachedValues: T[] = [];

  /**
   * Cached total count from the last successful data load.
   * Used to display count in header during loading.
   */
  cachedTotalCount: number | undefined;

  readonly listData$: Observable<EntitiesModel<T> | undefined> = this.service
    .getData()
    .pipe(
      tap((data) => {
        this.sortCode = data?.pagination?.sort;
        this.hasGhostData = this.service.hasGhostData(data);
        // Cache the values and total count when we have real data
        if (!this.hasGhostData && data?.values) {
          if (data.values.length > 0) {
            this.cachedValues = data.values;
          }
          if (data.pagination?.totalResults !== undefined) {
            this.cachedTotalCount = data.pagination.totalResults;
          }
        }
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

  /**
   * Performs search with the given query.
   * Triggered by clicking the search icon or pressing Enter.
   */
  search(pagination: P | undefined, query: string): void {
    if (pagination && this.isSearchEnabled) {
      this.service.search(pagination, query);
    }
  }

  /**
   * Clears the search query and reloads the list.
   */
  clearSearch(pagination: P | undefined): void {
    if (pagination) {
      this.searchQuery = '';
      this.service.clearSearch(pagination);
    }
  }
}
