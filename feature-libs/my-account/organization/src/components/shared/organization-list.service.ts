import { Injectable } from '@angular/core';
import { B2BSearchConfig } from '@spartacus/core';
import { Table, TablePagination, TableService } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { OrganizationTableType } from './organization.model';

/**
 * The `BaseOrganizationListService` deals with the table structure, table data and
 * initial/runtime pagination of tables inside the b2b organization.
 *
 *
 * @property {OrganizationTableType} type used to load the table structure configuration and generate table outlets
 */
@Injectable({
  providedIn: 'root',
})
export abstract class BaseOrganizationListService<T> {
  /**
   * The table type is used to get the table structure from the configuration as well
   * as generating outlet templates for the table.
   */
  protected abstract tableType: OrganizationTableType;
  /**
   * Configuration state of the pagination. This configuration remains during the session
   * and is not shared outside the UI components.
   */
  protected paginationState$: BehaviorSubject<
    B2BSearchConfig
  > = new BehaviorSubject({});

  /**
   * The actual data is feed in sets.
   */
  protected dataset$: BehaviorSubject<T[]> = new BehaviorSubject(null);

  protected abstract load(config: B2BSearchConfig, ...params: any): void;

  /**
   * Observes the pagination, dataset and table structure. The pagination will steer
   */
  getTable(...params: any): Observable<Table> {
    // Pagination observables is based on static configuration and merged the runtime
    // configuration on top
    const pagination$ = this.getConfig().pipe(
      tap((pagination) => this.load(pagination, ...params))
    );

    // Table structure observable based on breakpoint driven configuration.
    const tableStructure$ = this.tableService.buildStructure(this.tableType);

    return combineLatest([pagination$, this.dataset$, tableStructure$]).pipe(
      map(([pagination, data, structure]) => ({ pagination, data, structure })),
      filter((table) => table.data?.length > 0)
    );
  }

  /**
   * Loads the default pagination configuration for the `OrganizationTableType.COST_CENTER`
   * table type. The pagination configuration is merged with the runtime configuration (if any).
   */
  protected getConfig(): Observable<B2BSearchConfig> {
    return this.tableService.getConfig(this.tableType).pipe(
      map((config) => config.pagination),
      switchMap((pagination: TablePagination) =>
        this.paginationState$.pipe(
          map((runtimeConfig) => ({ ...pagination, ...runtimeConfig }))
        )
      )
    );
  }

  /**
   * The given configuration is merged with the current configuration and default configuration.
   * This allows to only change one part of the
   */
  set config(config: B2BSearchConfig) {
    this.paginationState$.next({ ...this.paginationState$.value, ...config });
  }

  constructor(protected tableService: TableService) {}
}
