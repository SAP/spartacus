import { Injectable } from '@angular/core';
import { BREAKPOINT } from 'projects/storefrontlib/src/layout/config/layout-config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { TableConfig } from './config/table.config';
import { TableStructure } from './table.model';

/**
 * Responsive table service.
 *
 * The `TableService` generates a `TableStructure` based on configuration. The table
 * structure configuration allows for breakpoint specific configuration, so that the table
 * experience can be differentiated various screen sizes.
 *
 * The table structure configuration is driven by a table type. The various supported
 * table types are exposed in feature libraries.
 */
@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(
    protected breakpointService: BreakpointService,
    protected config: TableConfig
  ) {}

  /**
   * Returns the table structure for the current breakpoint.
   *
   * The breakpoint is resolved by teh breakpoint service.
   */
  buildTableStructure(type: string): Observable<TableStructure> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => this.findTableStructureConfig(type, breakpoint))
    );
  }

  /**
   * Finds the best applicable table configuration for the given type
   * and breakpoint. If there is no configuration available for the breakpoint,
   * the best match will be returned, using mobile first approach.
   *
   * If there is no match for any breakpoint, the fallback is a configuration
   * without the notion of a breakpoint. Otherwise we fallback to the first
   * available config.
   */
  findTableStructureConfig(
    type: string,
    breakpoint: BREAKPOINT
  ): TableStructure {
    const tableConfig = this.config.table[type];

    if (!tableConfig) {
      return;
    }

    // find all relevant breakpoints
    const current = this.breakpointService.breakpoints.indexOf(breakpoint);
    const relevant = this.breakpointService.breakpoints
      .slice(0, current + 1)
      .reverse();

    const bestMatch: BREAKPOINT = relevant.find(
      (br) => !!tableConfig.find((structure) => structure.breakpoint === br)
    );

    return bestMatch
      ? tableConfig.find((config) => config.breakpoint === bestMatch)
      : tableConfig.find((structure) => !structure.breakpoint) ||
          tableConfig[0];
  }
}
