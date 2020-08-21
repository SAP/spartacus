import { PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Contains the table data and structure for the `TableComponent`.
 */
export interface Table<T = any> {
  /**
   * The table structure provides details about the headers of the table.
   */
  structure: TableStructure;

  /**
   * The table data is provided in an observable, so that we can observe changes
   * and benefit from change detection.
   *
   * The data type of the given table is not forced, as we want the table component
   * to be unaware of any specifics. The type can be handed in when the `Table` is
   * created however.
   */
  data$: Observable<T[]>;

  /**
   * The pagination component is used to paginate through the data.
   */
  pagination?: PaginationModel;
}

export interface TableStructureConfiguration {
  /**
   * Provide the bare structure of the table.
   */
  fields: string[];

  /**
   * Table headers can be  are added by default
   */
  hideHeader?: boolean;
}

/**
 * The TableStructure holds the header structure of the table.
 */
export interface TableStructure extends TableStructureConfiguration {
  /**
   * The table type is a mandatory property. It's used in various cases:
   * - identify the table structure configuration
   * - translate label keys into unique i18n properties
   * - use the type to generate unique outlet references for headers and data.
   * - add a unique class on the table, so we can apply custom css to it
   */
  type: string;
}
