import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { TableConfig, TableStructure } from './table.model';


/**
 * Responsive table service.
 */
@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(protected breakpointService: BreakpointService) {}

  /**
   * Returns the table structure for the current breakpoint.
   *
   * The breakpoint is resolved by teh breakpoint service.
   */
  getTableStructure(type: string): Observable<TableStructure> {
    return this.breakpointService.breakpoint$.pipe(
      map((br) => {
        const current = this.breakpointService.breakpoints.indexOf(br);
        const relevant = this.breakpointService.breakpoints.slice(
          0,
          current + 1
        );

        const config = this.getTableConfig(type);

        return (
          config[
            relevant.reverse().find((breakpoint) => !!config[breakpoint])
          ] || config.structure
        );
      })
    );
  }

  /**
   * Returns the table configuration for the given tableType.
   */
  protected getTableConfig(tableType: string): TableConfig {
    // TODO: move this to config
    const config = {
      costCenterList: {
        structure: {
          labels: [{ key: 'name' }],
          hideLabels: true,
        },
        md: {
          labels: [{ key: 'name' }, { key: 'unit' }],
        },
        lg: {
          labels: [
            { key: 'name', sortCode: 'byName' },
            { key: 'code', sortCode: 'byCode' },
            { key: 'currency' },
            { key: 'unit', sortCode: 'byUnit' },
          ],
        },
      } as TableConfig,
    };

    return config[tableType] || {};
  }
}
