import { Type } from '@angular/core';
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

  /**
   * The sort options for the table.
   */
  sorts?: any[];
}

export interface TableStructureConfiguration {
  /**
   * Provide the bare structure of the table.
   */
  cells?: string[];

  /**
   * Global table structure options.
   */
  options?: TableOptions;
}

export interface TableOptions {
  /**
   * Default pagination for the table that is used for the initial load of the table data.
   */
  pagination?: PaginationModel;

  /**
   * The layout for the table component can be used for horizontal, vertical and vertical stacked
   * table layouts.
   */
  layout?: TableLayout;

  /**
   * Global component to render table header _content_ (`<th>...</th>`). A specific component per
   * field can be configured alternatively.
   *
   * If no component is available, the table component will render a static label or use the
   * configured i18n label.
   */
  headerComponent?: Type<any>;

  /**
   * Global component to render table cell _content_ (`<td>...</td>`). A specific component per
   * field can be configured alternatively.
   *
   * If no component is available, the table content will render as-is.
   */
  dataComponent?: Type<any>;

  // field specific options
  cells?: {
    [fieldKey: string]: TableFieldOptions;
  };
}

/**
 * Layout orientation for the table configuration.
 */
export enum TableLayout {
  /**
   * Renders the table vertically, with a heading on top of the table.
   *
   * Vertical layout is most common and the default layout.
   */
  VERTICAL = 1,

  /**
   * Stacks items in a tables by generating a `tbody` for each item.
   */
  VERTICAL_STACKED,

  /**
   * Horizontal oriented table layout renders the table headers in the first column of the table.
   */
  HORIZONTAL,
}

export interface TableFieldOptions {
  /**
   * Optional label to add static or localized headers. If the label is not present, the
   * field key is mapped to a i18n property.
   */
  label?: string | TableHeader;

  /**
   * Indicates wether the cell is linkable.
   *
   * If the cells is linkable, an anchor link can be generated in the table data element.
   */
  linkable?: boolean;

  /**
   * Component to render table header _content_ (`<th>...</th>`) for the table field.
   *
   * If no component is configured, the global table component for the header will be used
   * instead.
   */
  headerComponent?: Type<any>;

  /**
   * Component to render table data _content_ (`<td>...</td>`) for the table field.
   *
   * If no component is configured, the global table component for the cell data will be used
   * instead.
   */
  dataComponent?: Type<any>;
}

/**
 * The TableStructure holds the header structure of the table.
 */
export interface TableStructure extends TableStructureConfiguration {
  /**
   * The table type is a mandatory property. The type is used to identify the table
   * configuration and is used to generate a unique outlet reference.
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

export interface TableHeaderOutletContext {
  _type: string;
  _field: string;
  _options?: TableOptions;
  /**
   * The i18nRoot is used to build localized table headers. The i18nRoot
   * is used as a prefix for the `_field`. Table header labels wil use the
   * following locales:
   *
   * `[i18nRoot].[_field]`
   */
  _i18nRoot?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableDataOutletContext extends TableHeaderOutletContext {
  [property: string]: any;
}
