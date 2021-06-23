import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  ResponsiveTableConfiguration,
  TableLayout,
  TableService,
  TableStructure,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { OrganizationTableType } from '../organization.model';

/**
 * The `ListService` deals with the table structure, list data and
 * pagination of tables inside the b2b organization.
 *
 * @property {OrganizationTableType} tableType
 *   Used to load the table structure configuration and generate table outlets.
 * @property {PaginationModel} pagination$
 *   The pagination state of the listing.
 */

@Injectable()
export abstract class ListService<T, P = PaginationModel> {
  /**
   * The default table structure is used to add the default configuration for all
   * organization list related tables. This avoids a lot of boilerplate configuration.
   */
  protected defaultTableStructure: ResponsiveTableConfiguration = {
    options: { layout: TableLayout.VERTICAL_STACKED },
    lg: { options: { layout: TableLayout.VERTICAL } },
  };

  /**
   * The ghost data contains an empty list of objects that is used in the UI
   * to render the HTML elements.
   *
   * This list contains 10 items, so that the ghost will show 10 rows by default.
   */
  protected ghostData = { values: new Array(10) } as EntitiesModel<T>;

  notification$: Subject<any> = new Subject();

  /**
   * The `viewType` is used to load the proper table configuration and localizations for the view.
   *
   * TODO: rename to `viewType`
   */
  protected abstract tableType: OrganizationTableType;

  /**
   * The domain type is used to bind fields to localized fields based on the domain.
   * This type differs from the `viewType`, which is related to a specific view
   * configuration.
   */
  protected _domainType: string;

  get viewType(): OrganizationTableType {
    return this.tableType;
  }

  get domainType(): string {
    return this._domainType ?? this.viewType;
  }

  /**
   * The pagination state of the listing.
   *
   * The pagination size defaults to 10, but can be overridden by the
   * table configuration for each entity type.
   */
  protected pagination$: BehaviorSubject<P> = new BehaviorSubject({
    pageSize: 10,
  } as any as P);

  constructor(protected tableService: TableService) {}

  /**
   * Indicates the unique key for the item model. The key is different for various
   * organizations, i.e. `budget.code`, `user.uid`.
   */
  key(): string {
    return 'code';
  }

  /**
   * Loads the data by delegating to the `load` method, which must be implemented
   * in specific implementations of this abstract class.
   *
   * The load method is streamed from the `pagination$` stream, which is initialized
   * with default pagination and structure drive properties.
   */
  getData(...args: any): Observable<EntitiesModel<T>> {
    return this.pagination$.pipe(
      // we merge any configured pagination from the table structure
      switchMap((pagination) =>
        this.getStructure().pipe(
          map((config) => ({ ...pagination, ...config.options?.pagination }))
        )
      ),
      switchMap((pagination) => this.load(pagination, ...args)),
      startWith(this.ghostData)
    );
  }

  /**
   * Returns the `TableStructure` for the `OrganizationTableType`.
   *
   * The table structure is build by the `TableService` based on configuration.
   * The `defaultTableStructure` is deep merged as a fallback configuration.
   */
  getStructure(): Observable<TableStructure> {
    return this.tableService.buildStructure(
      this.viewType,
      this.defaultTableStructure
    );
  }

  /**
   * Views the page.
   */
  view(pagination: P, nextPage?: number): void {
    this.pagination$.next({ ...pagination, currentPage: nextPage });
  }

  /**
   * Updates the sort code for the PaginationModel.
   *
   * The `currentPage` is reset to 0.
   */
  sort(pagination: P, _obsoleteSort?: string): void {
    this.view(pagination, 0);
  }

  /**
   * Indicates whether the given data equals to the ghost data.
   *
   * This is used to validate the initial loading state, which is
   * different from the loading state; the loading state occurs
   * while sorting and paginating, where as the initial loading state
   * only happens at the very first load.
   */
  hasGhostData(data: EntitiesModel<T>): boolean {
    return data === this.ghostData;
  }

  /**
   * Must be implemented to load the actual listing data. An unknown number of arguments
   * is supported for loading the data. These arguments are passed from the `getData` method.
   */
  protected abstract load(
    pagination: PaginationModel,
    ...args: any
  ): Observable<EntitiesModel<T>>;
}
