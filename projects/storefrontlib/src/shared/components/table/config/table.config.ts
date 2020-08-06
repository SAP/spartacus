import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { TableStructureConfiguration } from '../table.model';

/**
 * Helper configuration to introduce a breakpoint specific table configuration.
 */
export interface TableConfiguration extends TableStructureConfiguration {
  breakpoint?: BREAKPOINT;
}

/**
 * The `TableConfig` provides table configurations. The configuration allows for a
 * an optional breakpoint specific structure, so a dedicated table structure per
 * screen size can be generated (see `TableService`).
 *
 * The string based key is used to define a configuration for a specific type. The type
 * binds to a specific component, such as the cost-center table. The various table types
 * should be exposed by feature modules, to ease the configuration.
 *
 * The `TableConfiguration` is added in an array, so that any opinionated default configurations
 * can be replaced by customer configurations.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class TableConfig {
  table: {
    [key: string]: TableConfiguration[];
  };
}
