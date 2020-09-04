import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  ResponsiveTableConfiguration,
  Table,
  TableLayout,
  TableService,
  TableStructure,
} from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationTableType } from '../organization.model';

/**
 * The `BaseOrganizationListService` deals with the table structure, table data and
 * initial/runtime pagination of tables inside the b2b organization.
 *
 *
 * @property {OrganizationTableType} tableType Used to load the table structure configuration and generate table outlets.
 * @property {PaginationModel} pagination$ The pagination state of the listing.
 */

@Injectable()
export abstract class OrganizationListService<T, P = PaginationModel> {
  /**
   * The default table structure is used to add the default configuration for all
   * organization list related tables. This avoids a lot of boilerplate configuration.
   */
  protected defaultTableStructure: ResponsiveTableConfiguration = {
    options: { layout: TableLayout.VERTICAL_STACKED },
    lg: { options: { layout: TableLayout.VERTICAL } },
  };

  notification$: Subject<any> = new Subject();

  /**
   * The `viewType` is used to load the proper table configuration and localizations for the view.
   *
   * TODO: rename to `viewType`
   */
  protected abstract tableType: OrganizationTableType;

  get viewType() {
    return this.tableType;
  }

  /**
   * Bind to the domain specific fields and routing.
   * TODO: abstract
   */
  protected domainType: string;

  /**
   * The pagination state of the listing
   */
  protected pagination$: BehaviorSubject<P> = new BehaviorSubject(undefined);

  constructor(protected tableService: TableService) {}

  /**
   * Indicates the unique key for the item model. The key is different for various
   * organizations, i.e. `budget.code`, `user.uid`.
   */
  key(): string {
    return 'code';
  }

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
          ),
          map((table) => {
            // While we've build the table structure by a specific table type, we like the actual
            // table component to work with the domain type, so that the actual data field and locales
            // are reused.
            if (this.domainType) {
              table.structure.type = this.domainType;
            }
            // table.structure.domainType = this.domainType;
            return table;
          })
        )
      )
    );
  }

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
      this.tableService.buildStructure(
        this.tableType,
        this.defaultTableStructure
      ),
      this.pagination$,
    ]).pipe(
      map(([structure, pagination]: [TableStructure, P]) => {
        const clone: TableStructure = { options: {}, ...structure };
        clone.options.pagination = {
          ...({ pageSize: 10 } as PaginationModel),
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
