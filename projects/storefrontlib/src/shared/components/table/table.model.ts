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
   * The data that is listed in the table component.
   */
  data: T[];

  /**
   * The pagination component is used to paginate through the data.
   */
  pagination?: PaginationModel;
}

export interface TableStructureConfiguration {
  /**
   * Provide the bare structure of the table.
   */
  fields?: string[];

  options?: TableOptions;
}

export interface TableOptions {
  /**
   * Table headers can be  are added by default
   */
  hideHeader?: boolean;
  /**
   * Default pagination for the table that is used for the initial load of the table data.
   */
  pagination?: PaginationModel;

  // field specific options
  fields?: {
    [fieldKey: string]: TableFieldOptions;
  };
}

export interface TableFieldOptions {
  /**
   * Optional label to add static or localized headers. If the label is not present, the
   * field key is mapped to a i18n property.
   */
  label?: string | TableHeader;
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
  i18nKey?: string;
}
