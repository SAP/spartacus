/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { getLastValueSync } from '@spartacus/core';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import { TableHeaderOutletContext } from '../table.model';

@Component({
  selector: 'cx-table-data-cell',
  template: `{{ value }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  @HostBinding('attr.title')
  get value(): string {
    return this.field ? this.model[this.field] : undefined;
  }

  protected get model(): any {
    const context = getLastValueSync(this.outlet.context$);
    return context;
  }

  protected get field(): string | undefined {
    const context = getLastValueSync(this.outlet.context$);
    return context?._field;
  }
}
