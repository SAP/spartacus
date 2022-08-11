import { Injectable, Type } from '@angular/core';
import { Config } from '@spartacus/core';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { TableStructureConfiguration } from '../table.model';

/**
 * The `TableConfig` provides a table configurations for specific table types. You can define
 * an all-screen table structure as well as a breakpoint specific table structure. The various
 * table structures are merged from small to large screen configurations, depending on the users
 * screen size.
 *
 * The `table.type` is used as a key to distinguish the various table configurations in the application.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class TableConfig {
  table?: {
    [tableType: string]: ResponsiveTableConfiguration;
  };
  tableOptions?: {
    /**
     * Global component to render table header _content_ (`<th>...</th>`). A specific component
     * can be configured alternatively per table or table field.
     */
    headerComponent?: Type<any>;

    /**
     * Global component to render table cell _content_ (`<td>...</td>`). A specific component per
     * field can be configured alternatively.
     *
     * If no component is available, the table content will render as-is.
     */
    dataComponent?: Type<any>;
  };
}

/**
 * Helper configuration to introduce breakpoint specific table configuration.
 */
export interface ResponsiveTableConfiguration
  extends TableStructureConfiguration {
  /** The table configurations for all screens */
  [BREAKPOINT.xl]?: TableStructureConfiguration;
  /** The table configurations for large screens and smaller */
  [BREAKPOINT.lg]?: TableStructureConfiguration;
  /** The table configurations for medium screens and smaller */
  [BREAKPOINT.md]?: TableStructureConfiguration;
  /** The table configurations for small screens and smaller */
  [BREAKPOINT.sm]?: TableStructureConfiguration;
  /** The table configurations for extra small screens */
  [BREAKPOINT.xs]?: TableStructureConfiguration;
}

declare module '@spartacus/core' {
  interface Config extends TableConfig {}
}
