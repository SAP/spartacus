import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
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
  protected pagination$: BehaviorSubject<PaginationModel> = new BehaviorSubject(
    null
  );

  constructor(protected tableService: TableService) {}

  protected abstract load(
    structure: TableStructure,
    ...params: any
  ): Observable<Table<T>>;

  /**
   * Updates the pagination for the listing, so that the listing gets updated.
   */
  set pagination(pagination: PaginationModel) {
    this.pagination$.next(pagination);
  }

  getTable(...params: any): Observable<Table<T>> {
    return this.getStructure().pipe(
      switchMap((structure) => this.load(structure, ...params))
    );
  }

  protected getStructure(): Observable<TableStructure> {
    return this.pagination$
      .pipe(withLatestFrom(this.tableService.buildStructure(this.tableType)))
      .pipe(
        map(([pagination, structure]) => ({
          ...structure,
          pagination: { ...structure.pagination, ...pagination },
        }))
      );
  }

  /**
   * Populates the cost center data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected populateData(
    structure: TableStructure,
    data: EntitiesModel<any>
  ): Table<T> {
    return {
      structure,
      data: data.values,
      pagination: data.pagination,
    };
  }
}
