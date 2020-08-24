import { Injectable } from '@angular/core';
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
  table: {
    [tableType: string]: ResponsiveTableConfiguration;
  };
}

/**
 * Helper configuration to introduce breakpoint specific table configuration.
 */
interface ResponsiveTableConfiguration extends TableStructureConfiguration {
  /** The table configurations for all screens */
  [BREAKPOINT.xs]?: TableStructureConfiguration;
  /** The table configurations for large screens and smaller */
  [BREAKPOINT.lg]?: TableStructureConfiguration;
  /** The table configurations for medium screens and smaller */
  [BREAKPOINT.md]?: TableStructureConfiguration;
  /** The table configurations for small screens and smaller */
  [BREAKPOINT.sm]?: TableStructureConfiguration;
  /** The table configurations for extra small screens */
  [BREAKPOINT.xs]?: TableStructureConfiguration;
}
