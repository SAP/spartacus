import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationTableType } from './organization.model';

/**
 * The `BaseOrganizationListService` deals with the table structure, table data and
 * initial/runtime pagination of tables inside the b2b organization.
 *
 *
 * @property {OrganizationTableType} tableType Used to load the table structure configuration and generate table outlets.
 * @property {PaginationModel} pagination$ The pagination state of the listing.
 */

@Injectable()
export abstract class BaseOrganizationListService<T, P = PaginationModel> {
  /**
   * Used to load the table structure configuration and generate table outlets.
   */
  protected abstract tableType: OrganizationTableType;

  /**
   * The pagination state of the listing
   */
  protected pagination$: BehaviorSubject<P> = new BehaviorSubject(null);

  constructor(protected tableService: TableService) {}

  /**
   * Converts the list entities into the `Table` model, including the (responsive/ configurable)
   * table structure. The actual data loading of the listing is delegated to the abstract `load`
   * method, which must be implemented in specific implementations of this abstract class.
   *
   * The loaded entities are populated in the `Table` structure, using the generic `populate` method.
   *
   * The method supports an unknown number of arguments that is passed to the `load` method, so that
   * implementations can leverage these arguments during loading of the listing.
   */
  getTable(...args: any): Observable<Table<T>> {
    return this.getStructure().pipe(
      switchMap((structure) =>
        this.load(structure, ...args).pipe(
          map(
            ({ values, pagination, sorts }) =>
              ({
                structure,
                data: values,
                pagination: { ...pagination },
                sorts,
              } as Table<T>)
          )
        )
      )
      // map((tableData) => (!tableData.data.length ? null : tableData))
    );
  }

  // /**
  //  * Updates the pagination with the new page number.
  //  */
  // viewPage(pagination: P, page: number): void {
  //   this.pagination$.next({ ...pagination, currentPage: page });
  // }

  // /**
  //  * Updates the sort code for the PaginationModel, and resets the `currentPage`.
  //  */
  // sort(pagination: P, sortCode: string): void {
  //   this.pagination$.next({
  //     ...pagination,
  //     currentPage: 0,
  //     sort: sortCode,
  //   });
  // }

  /**
   * Views the page.
   */
  view(pagination: P, nextPage?: number): void {
    this.pagination$.next({ ...pagination, currentPage: nextPage });
  }

  // tmp keep this method till all is migrated to view()
  viewPage(pagination: P, nextPage?: number) {
    this.view(pagination, nextPage);
  }

  /**
   * Updates the sort code for the PaginationModel.
   *
   *  and resets the `currentPage`.
   */
  sort(pagination: P, _obsoleteSort?: string): void {
    this.view(pagination, 0);
  }

  /**
   * Loads the `TableStructure` for the `tableType` property. The pagination$ state is combined
   * so that new structure is generated whenever the table structure or pagination changes.
   */
  protected getStructure(): Observable<TableStructure> {
    return combineLatest([
      this.tableService.buildStructure(this.tableType),
      this.pagination$,
    ]).pipe(
      map(([structure, pagination]: [TableStructure, P]) => {
        const clone: TableStructure = { options: {}, ...structure };
        clone.options.pagination = {
          ...clone.options.pagination,
          ...pagination,
        };
        return clone;
      })
    );
  }

  /**
   * Must be implemented to load the actual listing data. An unknown number of arguments
   * is supported for loading the data. These arguments are passed from the `getData` method.
   */
  protected abstract load(
    structure: TableStructure,
    ...args: any
  ): Observable<EntitiesModel<T>>;
}
