import { PaginationModel } from '@spartacus/core';

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
  data: T[];

  /**
   * The pagination component is used to paginate through the data.
   */
  pagination?: PaginationModel;

  sorts?: Sort[];
}

export interface Sort {
  code?: string;
  selected?: boolean;
}

/**
 * Configuration to provide the default structure of a table. The configuration allows
 * a default configuration as well as specific configurations per breakpoint (i.e. mobile
 * vs desktop).
 */
export interface TableStructureConfiguration {
  /**
   * Provide the bare structure of the table.
   */
  headers?: TableHeader[];

  /**
   * Table headers can be  are added by default
   */
  hideHeader?: boolean;

  /**
   * Default pagination for the table that is used for the initial load of the table data.
   */
  pagination?: PaginationModel;
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

  styleClass?: string;
}

/**
 * Provides the core table structure, typically being used to render table columns.
 */
export interface TableHeader {
  /**
   * The header key is used to:
   * - generate a unique class on each table row
   * - generate a template for each table header cell and data cell
   * - translate the key using the translate module
   *   (fallback in case there is no label available)
   */
  key?: string;

  /**
   * Optional label to add non-localized headers. If the label is not present, the
   * key is used to translate to an i18n property.
   */
  label?: string;

  /**
   * Provides an optional sort code to sort the table data per header.
   */
  sortCode?: string;
}

export interface TableValue extends TableHeader {
  value?: any;
}
